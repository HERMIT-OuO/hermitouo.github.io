---
title: Lucid 入门指南  # 博客标题（必须）
subtitle: Lucid guide  # 博客副标题（可选）
date: 2021-11-3  # 博客日期，会显示在文章头部（可选）
author: HERMIT  # 博客作者（可选，不填的话会使用 `themeConfig.personalInfo.name`）
header_style: image # 是否在博客中显示封面图：`image`（显示） / `text`（不显示）（可选，默认为 `text`）
header_img: https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/2021-11-3-lucid-start.png  # 博客封面图（必须，即使上一项选了 `text`，图片也需要在首页显示）
catalog: true  # 是否启用右侧目录：false / true（可选，默认为 false）
tags:  # 博客标签
  - P4
  - Network
  - SDN
---

## Lucid 基础概念
在 Lucid 中，有三个核心抽象概念，分别是：`event`（事件）、`handlers`（处理器）和`arrays`（数组）。为了了解应该如何使用这些核心组件，Lucid 提供了 `histogram.dpt` （一个简单的测量程序）实例程序供使用者学习。程序的可视化结构如下：

![image-20210926102953814](https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/image-20210926102953814.png)

### 事件和处理器

#### 事件

事件是 Lucid 通信的基础，是系统正在处理的数据包的抽象表示，也是系统中组件之间的控制信息。每个事件都有一个名字，并且携带用户指定的数据作为参数。

例如，在 `histogram.dpt` 中，存在一个名为 `ip_in` 的事件。该事件是一个数据包的抽象表达，参数为输入端口、源地址、目的地址、数据包长度和 tos 字节。声明如下：

```lucid
event ip_in (int<<9>> igr_port, int src, int dst, int<<16>> len, int<<8>> tos);
```

当数据包到达交换机时，由底层交换机生成该事件。

#### 处理器

处理器是 Lucid 中主要的计算组件。处理器是一个命令式的函数，当某个事件发生时执行。处理程序可以操作本地变量，本地变量只在事件的存活时间中存在，也可以操作全局变量，全局变量在数据包中持续存在。处理器也可以创建新的事件，以便后续使用。

下面是 `histogram.dpt` 中的 `ip_in` 处理器：

```lucid
handle ip_in (int<<9>> igr_port, int src, int dst, int<<16>> len, int<<8>> tos) {
  int idx = 0;
  if (len <= 128) { 
    idx = 0;
  } else {
    if (len <= 512) {
      idx = 1;
    } else {
      if (len <= 1024){ 
        idx = 2;
      } else {
        idx = 3;
      }
    }
  }
  Array.setm(hist_arr, idx, incr, 1);
  int total_ct = Array.update(total_arr, 0, incr, 1, incr, 1);
  if (total_ct == pktct_interval) {
    generate report(0);
  }
  generate ip_out(igr_port, src, dst);
}
```

在 `ip_in` 处理器中，我们使用 `Array` 更新了 `histogram` 的持久状态，创建了一个新的事件 `ip_out`，该事件可以将数据包下发至交换机，指定了数据包的发送端口。

此外，处理器还声明了一个新的事件`report` ，该事件将 `histogram` 状态导出到收集信息的服务器。下面是 `report` 处理器的实现：

```lucid
handle report(int idx){
    int cur_idx = idx; 
    int column_ct = Array.update(hist_arr, cur_idx, getf, 0, setf, 0);
    generate ip_out(collector_port, cur_idx, column_ct);                
    if (cur_idx == 0) {
      Array.set(total_arr, 0, 0);      
    }
    if (cur_idx < 3){       
      generate report(cur_idx + 1);
    }
}
```

#### 继续和递归

当一个处理器生成一个事件时，该事件被编码为一个数据包，重新循环，并在随后通过交换机的管道进行处理。我们可以把生成事件`bar` 的处理器 `foo` 看作一个名为 `foo` 的函数，它调用了一个延续函数 `bar` 在未来的某个时间执行。

在 Lucid 中，处理器通过生成事件来表达那些过于复杂而无法在交换机通道中一次完成的计算。

处理器也可以是递归的，可以调用处理器本身。

在 `report` 处理器中，接收 `idx` 进行处理，而后递归地调用本身处理 `idx+1`。每个事件都在交换机的管道中被单独处理，递归继续进行，直到 `hist_arr` 中的全部元素都被处理完毕。

当然，递归也是有代价的，每次递归都会导致一个数据包被重新循环，造成时延。但这类时延无法避免：在底层硬件中，每个数据包只能访问每个持久性的内存阵列中的一个元素。

#### 进入和退出事件

`entry event` 和 `exit event` 可以将可编程交换机的数据包转入 Lucid 程序或转出 Lucid 程序。例如，在 `histogram.dpt` 中有如下两个事件：

```lucid
entry event ip_in (int<<9>> igr_port, int src, int dst, int<<16>> len, int<<8>> tos);
event report(int idx);
exit event ip_out (int<<9>> egr_port, int src, int dst);
```

`evene` ：常规事件，由 Lucid 创建，并由 Lucid 处理。

`entry event`：进入事件，由可编程交换机创建，交由 Lucid 进行处理。

`exit event`： 退出事件，相反地，由 Lucid 创建，交由可编程交换机处理。

### Arrays 数组

Lucid 程序通过 `Arrays` 模块与持久化状态进行交互。在 `histogram.dpt` 中，我们可以看到一些对 `Array` 的操作：

```lucid
Array.set(hist_arr, idx, incr, 1);
int total_ct = Array.update(total_arr, 0, incr, 1, incr, 1);
```

一般来说，`Array` 方法可以从持久化的数组中的特定单元读取一个值，进行少量的计算，然后将结果返回给内存单元或者局部变量。

#### Array ordering

Lucid 的类型检查器执行两个与数组相关的检查操作，旨在捕获底层硬件无法支持的内存访问模式的程序。具体地说，Lucid 的类型系统要求你在有状态的操作上遵守如下两条规则：

1. 始终按照声明的顺序访问 `Array`
2. 在程序的每个控制流中只访问 `Array` 一次

如果你在编写程序时，违反了以上两条规则，那么你将收到 Lucid “温馨”的错误提示。

#### **Memops**

当你调用 `Array` 的方法时，通常需要传递一个 `memops` 函数。这个函数描述了从持久化内存中读取状态的计算，然后将结果返回给它所读取的内存单元，或者程序中的一个局部变量。

例如 `Array.setm(hist_arr, idx, incr, 1)` 等价为 `hist_arr[idx] = incr(hist_arr[idx], 1)`。

`incr` 进行如下定义：

```lucid
memop incr(int memval, int incrval) {
    return memval + incrval;
}
```

类比 C 语言，我们声明了一个 `memop` 类型的函数，名为 `incr`，接受两个参数，并返回一个结果。

Lucid 对 `Memops` 有如下限制：

1. 一个 `memop` 只能有两个参数
2. 一个 `memop` 有且只能有一个返回值
3. 一个 `memop` 只能使用每个参数一次

> A note on memop restrictions: If you are familiar with the Tofino, you might observe that these rules are more limiting than the underlying hardware. However, they present a simpler and more regular interface to state that simplifies a developer's mental model. In the future, our goal is for Lucid's memop syntax to be extendible, so that developers can choose their own balance between regularity and completeness.

#### Array.update

Array 最强大的方法是 `update` 函数，`update` 允许用户并行地执行读写操作，例如：

```lucid
int total_ct = Array.update(total_arr, 0, incr, 1, incr, 1);
```

使用一个语句完成了 `total_arr[0] + 1 + 1` 的操作，在 C 语言中，我们一般会使用如下代码完成该功能：

```
int tmp = incr(total_arr[0], 1); 
total_arr[0] = incr(total_arr[0], 1); 
total_ct = tmp;
```

同样，由于对 `memops` 的语法限制，Lucid 可以保证任何 `Array.update` 的调用可以被编译为底层硬件的合法指令。
