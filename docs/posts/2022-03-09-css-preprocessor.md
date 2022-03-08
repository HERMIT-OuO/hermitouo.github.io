---
title: CSS 预处理器和 PostCSS  # 博客标题（必须）
subtitle: CSS preprocessor and PostCSS  # 博客副标题（可选）
date: 2022-03-09  # 博客日期，会显示在文章头部（可选）
author: HERMITOUO  # 博客作者（可选，不填的话会使用 `themeConfig.personalInfo.name`）
header_style: text # 是否在博客中显示封面图：`image`（显示） / `text`（不显示）（可选，默认为 `text`）
header_img: https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/2022-03-09-css-preprocessor.png  # 博客封面图（必须，即使上一项选了 `text`，图片也需要在首页显示）
catalog: true  # 是否启用右侧目录：false / true（可选，默认为 false）
header_mask: rgba(43, 41, 41, .5)
tags:  # 博客标签
  - FrontEnd
  - CSS
---

## 什么是 CSS 预处理器

> **CSS 预处理器**是一个能让你通过预处理器自己独有的语法来生成 CSS 的程序。市面上有很多 CSS 预处理器可供选择，且绝大多数 CSS 预处理器会增加一些原生 CSS 不具备的特性，例如代码混合，嵌套选择器，继承选择器等。这些特性让 CSS 的结构更加具有可读性且易于维护。

要使用 CSS 预处理器，你必须在 web 服务中服务器安装 CSS 编译工具。

市面上有很多 CSS 预处理器可供选择，且绝大多数 CSS 预处理器会增加一些原生 CSS 不具备或不完善的高级特性，这些特性让 CSS 的结构更加具有可读性且易于维护。当前社区代表的 CSS 预处理器，主要有以下几种：

- Sass：2007 年诞生，最早也是最成熟的 CSS 预处理器，拥有 Ruby 社区的支持和 Compass 这一最强大的 CSS 框架，目前受 LESS 影响，已经进化到了全面兼容 CSS 的 SCSS。
- Less：2009 年出现，受 SASS 的影响较大，但又使用 CSS 的语法，让大部分开发者和设计师更容易上手，在 Ruby 社区之外支持者远超过 SASS，其缺点是比起 SASS 来，可编程功能不够，不过优点是简单和兼容 CSS，反过来也影响了 SASS 演变到了 SCSS 的时代，著名的 Twitter Bootstrap 就是采用 LESS 做底层语言的。
- Stylus：Stylus 是一个 CSS 的预处理框架，2010 年产生，来自 Node.js 社区，主要用来给 Node 项目进行 CSS 预处理支持，所以 Stylus 是一种新型语言，可以创建健壮的、动态的、富有表现力的 CSS。比较年轻，其本质上做的事情与 SASS/LESS 等类似。

### 特性

- 变量（variables）：允许我们定义 CSS 变量，并支持一定的运算。

	```css
	$font-size: 16px;

	.font-lager {
		font-size: 1.5 * $font-size;
	}
	```

- 代码混合（mixins）：允许我们进行 CSS 代码的快速复用。

    ```css
    @mixin clearfix {
      &:after {
        display: block;
        content: '';
        clear: both;
      }
    }
    
    .sidebar{
      @include clearfix;
    }
    ```

- 嵌套（nested rules）：允许我们嵌套 CSS 选择器，提供更清晰的层次结构。

- 代码模块化（Modules）：为 CSS 文件加入作用域和模块依赖，以解决 CSS 全局污染问题。

### 不足

- 额外的编译配置
- 编译成本
- 学习成本
- 调试困难


## 什么是 PostCSS

> PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins， 编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。

我们可以把 PostCSS 视为一个处理 CSS 语句的系统，它无法提供直接的功能支持，但通过添加各类插件，让系统具有强大的处理能力，例如：
- [autoprefixer](https://github.com/postcss/autoprefixer)：加入各家浏览器的前缀词（prefix）。
- [postcss-modules](https://github.com/css-modules/postcss-modules)：生成 CSS Modules/Scoped CSS。
- [stylelint](https://stylelint.io/)：语法检查器。

通过添加不同的插件，PostCSS 既可以完成预处理器的工作，也可以扮演后处理器的角色。

PostCSS 提供了一个解析器，可以将 CSS 解析为抽象的语法树（AST）。总体来说，它可以：

- 为 CSS 提供额外的功能；
- 允许前端工程师使用 JavaScript 开发插件运行在平台之上。

## PostCSS 的使用（Webpack）

### 安装 PostCSS 与相关套件

 ```bash
 npm install postcss postcss-loader autoprefixer precss --save-dev
 # or
 yarn add postcss postcss-loader autoprefixer precss
 ```

### 在 Webpack 配置文件中加入 postcss-loader

```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
    },
  ],
},
```

### 在 PostCSS 配置文件中添加插件

安装好 PostCSS 插件后，我们需要在 `postcss.config.js` 文件中引入并进行需要的配置。

```js
module.exports = {
  plugins: {
    precss: {}, // 使用类似 SASS 的功能
    autoprefixer: {
      // 加入各家浏览器的前缀
      browsers: [
        // 设置支持的浏览器版本
        'Chrome >= 52',
        'FireFox >= 44',
        'Safari >= 7',
        'Explorer >= 11',
        'last 2 Edge versions',
      ],
    },
  },
};

```

## 参考

- [《你是否可以抛弃 CSS 预处理器？》](https://jelly.jd.com/article/5dcb9c73641a030153732a89)
- [《CSS 预处理器》](https://developer.mozilla.org/zh-CN/docs/Glossary/CSS_preprocessor)