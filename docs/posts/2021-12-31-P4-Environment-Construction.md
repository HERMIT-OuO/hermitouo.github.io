---
title: P4_16 实验环境搭建  # 博客标题（必须）
subtitle: P4_16 Environment Construction  # 博客副标题（可选）
date: 2021-12-31  # 博客日期，会显示在文章头部（可选）
author: HERMIT  # 博客作者（可选，不填的话会使用 `themeConfig.personalInfo.name`）
header_style: text # 是否在博客中显示封面图：`image`（显示） / `text`（不显示）（可选，默认为 `text`）
header_img: https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/2021-12-31-P4-Environment-Construction.png  # 博客封面图（必须，即使上一项选了 `text`，图片也需要在首页显示）
catalog: true  # 是否启用右侧目录：false / true（可选，默认为 false）
header_mask: rgba(43, 41, 41, .5)
tags:  # 博客标签
  - P4
  - Network
  - SDN
---

## 前言

由于 P4 相关组件的升级，Python 支持从 2.x 升级为 3.x，本文基于 Ubuntu 20.04 + Python3.8 进行 P4 环境的搭建。

本教程安装脚本由 **[poohdang](https://gitee.com/poohdang)** 提供，在 poohdang 脚本基础之上做了微调和补充。

## 系统环境

| 项目        | 详情          |
| ----------- | ------------- |
| 系统        | Ubuntu 20.04  |
| 内存        | 推荐 3G 以上  |
| 存储        | 推荐 25G 以上 |
| Python 版本 | 3.x           |

请确保 `python` 命令可以访问 `python3`，使用如下命令绑定并检查：

```bash
ln -s /usr/lib/python3.x /usr/lib/python    # 将 Python3.x 链接至 Python

# 检查 python 和 pip 是否可以正常使用
python -V
python -m pip -V      
```

## 环境搭建

### 安装 Git

```bash
sudo apt update

sudo apt install git
```

### 设置工作目录并配置环境变量

```bash
# 以下目录可自定义

mkdir -p ~/P4 && echo "export P4_HOME=~/P4" >> ~/.bashrc  
source ~/.bashrc
cd $P4_HOME # 该环境变量必须生效，后续脚本需要
git clone https://gitee.com/poohdang/p4-env.git
cd p4-env
```

### 安装依赖

```bash
sudo chmod 755 p4*.sh
./p4-deps.sh
```

### 下载 P4 组件源码

#### 组件介绍

|                            组件名                            |                       功能                       |  版本   |
| :----------------------------------------------------------: | :----------------------------------------------: | :-----: |
| [mininet](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fmininet%2Fmininet) |                   网络仿真工具                   | Latest  |
| [bmv2](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fp4lang%2Fbehavioral-model) |             支持 P4 编程的软件交换机             | Latest  |
| [PI](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fp4lang%2FPI) |                P4 Runtime Server                 | Latest  |
| [p4c](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fp4lang%2Fp4c) |                    P4 编译器                     | Latest  |
| [tutorials](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fp4lang%2Ftutorials) |            P4 官方提供的快速上手教程             | Latest  |
| [protobuf](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fprotocolbuffers%2Fprotobuf) |        数据消息交换格式，grpc 的默认选项         | v3.12.2 |
| [grpc](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fgrpc%2Fgrpc) | 谷歌开发的远程程序调用（RPC）框架，PI 基于此实现 | v1.30.0 |

#### 直接下载（推荐）

```bash
./p4-git.sh
```

#### 国内镜像加速

使用`https://hub.fastgit.org`加速的仓库。

```bash
./p4-git-china.sh
```

### 编译并安装

在运行安装脚本之前，我们需要手动修改 `behavioral-model/install_deps.sh` 文件。

`BMV2` 需要 `Thrift ` 依赖作为支持， 而使用 `Thrift` 需要首先安装 `libssl` 。在 `Ubuntu 18.04` 中，`libssl` 的 apt 包名为 `libssl1.0-dev`，在 `Ubuntu 20.04` （以及 18.04 之前的版本）中 apt 包名为 `libssl-dev`。但在 `install_deps.sh` 中，我们可以看到，开发组在 20.04 仍中使用 `libssl1.0-dev` ，对此我们进行简单的修改。

```bash
vim install_deps.sh
```

将 `if [[ "${ubuntu_release}" > "18" ]]` 的条件判断从 `>` 修改为 `=`：

```shell
ubuntu_release=`lsb_release -s -r`
if [[ "${ubuntu_release}" = "18" ]]
then
    # This older package libssl1.0-dev enables compiling Thrift 0.9.2
    # on Ubuntu 18.04.  Package libssl-dev exists, but Thrift 0.9.2
    # fails to compile when it is installed.
    # TBD: whether using this package makes a difference for Ubuntu
    # 18.04 and Thrift 0.11.0.
    LIBSSL_DEV="libssl1.0-dev"
else
    LIBSSL_DEV="libssl-dev"
fi
```

最后执行安装脚本，并耐心地进行等待。如果配置的内存过低，系统可能会在编译阶段失去响应。

```bash
./p4-install.sh
```

### 为 sudo python 添加模块搜索路径

由于安装过程中，一部分命令需要以 `sudo` 的权限执行，导致部分 Python 依赖被安装在了 `root` 用户的目录下，而另一部分被安装在了普通用户的目录下。而我们通常使用 `sudo make` 运行 P4 程序，在 `sudo python` 搜索路径中找不到 `python` 中安装的依赖。

在 `/usr/local/lib/python3.8/dist-packages` 下新建 `xx.pth` 文件，输入：

```bash
/home/用户名/.local/lib/python3.8/site-packages
/usr/local/lib/python3.8/site-packages
```

如果你完全使用以上脚本安装，将上述内容写入 `xx.pth` 中即可正常使用 P4。

可使用以下命令检查 `sudo python` 的搜索路径：

```python
import sys
sys.path
```

附上可以正常使用的 path：

```
'', 
'/usr/lib/python38.zip', 
'/usr/lib/python3.8', 
'/usr/lib/python3.8/lib-dynload', 
'/usr/local/lib/python3.8/dist-packages', 
'/usr/local/lib/python3.8/dist-packages/protobuf-3.12.2-py3.8-linux-x86_64.egg',
'/usr/local/lib/python3.8/dist-packages/thrift-0.11.0-py3.8-linux-x86_64.egg', 
'/home/p4/.local/lib/python3.8/site-packages', 
'/usr/local/lib/python3.8/site-packages', 
'/usr/lib/python3/dist-packages'
```

