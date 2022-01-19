---
title: 完善 Windows 字体渲染方案  # 博客标题（必须）
subtitle: Refining the Windows font rendering scheme  # 博客副标题（可选）
date: 2022-01-17  # 博客日期，会显示在文章头部（可选）
author: HERMITOUO  # 博客作者（可选，不填的话会使用 `themeConfig.personalInfo.name`）
header_style: image # 是否在博客中显示封面图：`image`（显示） / `text`（不显示）（可选，默认为 `text`）
header_img: https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/2022-01-17-refining-windows-font-rendering.jpg  # 博客封面图（必须，即使上一项选了 `text`，图片也需要在首页显示）
catalog: true  # 是否启用右侧目录：false / true（可选，默认为 false）
header_mask: rgba(43, 41, 41, .5)
tags:  # 博客标签
  - Font
  - Windows
---

## 前言

在 Windows 开发初期，用户的屏幕大多停留在低分辨率水平，再加上向前兼容的历史包袱，导致 2022 年的 Windows 的字体渲染方案仍是以**点阵**的方式渲染，笔画中的每一个像素对应屏幕上的一个像素，对于不喜欢像素风格的用户来讲，一定程度上影响了使用体验。

但随着 Windows 市场中高分屏的普及（事实上，1080P 及以下的普通分辨率的屏幕仍占主要部分）和系统本身的发展，Windows 的字体渲染也在慢慢进步。目前，与公认字体渲染效果较好的 macOS 也只是风格上的区别，但如果你仍在为 Windows 下的字体效果而困扰，可以尝试下面几种解决方案。

## 终极方案

### 使用高分屏搭配 200% 缩放

正如前文所述，Windows 的字体渲染为了兼顾低分辨率屏幕的显示效果，采用了较为传统的点阵渲染方法。但只要将缩放开启到 200% 以上，即可激活全方向抗锯齿模式，字体渲染效果可以得到很大的提升。

这是由于 Windows 系统内置的 Gasp 表对不同字号的字体使用不同的渲染策略。当显示的字号大于一个阈值，系统会对这部分文字开启平滑渲染，可以很大程度上缓解字体显示的颗粒感。

所以，如果你希望在 Windows 上获得比较好的字体渲染效果，又不想进行相对复杂的字体替换和配置。在购入显示设备时，可以选择开启 200% 缩放后 UI 显示大小合适的产品。例如，27 英寸 3840x2160 屏幕，可开启 150%~200% 缩放。14 英寸，2880x1800 屏幕，可开启 200% 以上缩放。

### 更换使用高分屏的 MAC

macOS 使用了 Windows 不同的渲染策略，相比于 Windows 的点阵像素风，macOS 使用更接近印刷体的渲染风格，在观感上更为浑厚、平滑。因此，如果你难以接受 Windows 的字体渲染风格，又并非一定要使用 Windows 平台，可以购入使用 Retina 屏幕的 macOS 设备来解决。

## 字体渲染优化方案

### 替换字体

注：替换字体是一件麻烦且风险很大的事情，请做好准备并在替换前备份原有字体。

**Noble Scarlet**

在 Windows 10 17025 版本中，出现了代号为「Noble Scarlet」的新款字体，也被称为新版微软雅黑。Noble Scarlet 在汉字部分使用方正兰亭黑Pro，相比微软雅黑，新字体经过了多次改进和调整，解决了一部分 hinting 导致的奇怪问题，获得了更好的观感。

在 Windows 11 中，只需要下载 Noble Scarlet 并安装文件名为 `msyh.ttc`、`msyhbd.ttc` 和 `msyhl.ttc` 三款字体，即可自动替换原有的「微软雅黑」，安装完成重启后生效。

在 Windows 10 中，可以使用[字体替换工具](https://www.fishlee.net/soft/SysFontReplacer/)，或者进入 PE 进行替换。

**更纱黑体**

更纱黑体是一个在 100% 缩放比例下同样有着优秀的显示效果的字体，由 [Inter](https://link.zhihu.com/?target=https%3A//rsms.me/inter/) 和思源黑体的汉字部分合并而来，在 [Github](https://github.com/be5invis/Sarasa-Gothic/releases) 中可以下载到最新版本的 `ttc` 文件。安装、替换系统字体为「更纱黑体 UI SC」（英文描述为 「Sarasa UI SC」）即可。其中 UI 表示「窄引号」，SC 表示「简体汉字字形」。

![2K 分辨率下，微软雅黑对比更纱黑体（文件资源管理器界面），图源自 SpencerWoo ](https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/font2.png "2K 分辨率下，微软雅黑对比更纱黑体（文件资源管理器界面），图源自 SpencerWoo ")

### 使用 MacType

如果替换字体还不能满足你的需要，那可以尝试使用这款集字体替换、美化和微调与一体的字体个性化软件。使用 MacType 可能需要经过反复的调整才能在你的显示设备达到良好的效果，并且可能会导致一部分程序不稳定（可以排除这些不兼容的程序或进程）。

下载地址：[MacType](https://www.mactype.net/)

简单配置教程：[MacType 配置图解](https://blog.csdn.net/w19981220/article/details/47993893)

下面是使用 MacType + Noble Scarlet 前后的对比效果：

![4K 分辨率下，使用 MacType 前后字体渲染效果对比](https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/image-20220117112458923.png "4K 分辨率下，使用 MacType 前后字体渲染效果对比")