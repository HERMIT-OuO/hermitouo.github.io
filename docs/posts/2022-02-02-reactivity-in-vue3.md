---
title: Vue 3 中的响应式  # 博客标题（必须）
subtitle: Responsive in Vue 3  # 博客副标题（可选）
date: 2022-02-02  # 博客日期，会显示在文章头部（可选）
author: HERMITOUO  # 博客作者（可选，不填的话会使用 `themeConfig.personalInfo.name`）
header_style: text # 是否在博客中显示封面图：`image`（显示） / `text`（不显示）（可选，默认为 `text`）
header_img: https://imunetgroup.oss-cn-huhehaote.aliyuncs.com/gaotianyu/2022-02-02-reactivity-in-vue3.png  # 博客封面图（必须，即使上一项选了 `text`，图片也需要在首页显示）
catalog: true  # 是否启用右侧目录：false / true（可选，默认为 false）
header_mask: rgba(43, 41, 41, .5)
tags:  # 博客标签
  - Vue
  - FrontEnd
---



## Vue 2 中的响应式

在 Vue 2 中，我们通常使用如下的方式声明一个响应性的数据。如果希望在 view 层跟踪数据的变化，需要在 `data` 函数中，将变量作为对象的属性返回。

```javascript
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    data() {
      return {
        title: "Hello, Vue!"
      };
    }
  };
</script>
```

在 Vue 2 内部，为了追踪每个数据的变化，Vue 会解析每个属性，并使用 `Object.defineProperty()` 方法创建 `getters` 和 `setters` 。

## Vue 3 中的响应式

由于 Composition API 的提出，我们定义数据的方式也随之发生改变。在下面的例子中，我们定义了一个 `title` 变量，但改变 `title` 的值，并不会引起视图层的变化。

```javascript
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    setup() {
      let title = "Hello, Vue 3!";
			
	  setTimeout(() => {
        title = "THIS IS A NEW TITLE";
      }, 5000);
		
      return { title };
    }
  };
</script>
```

这是因为 Composition API 要求我们在 `setup` 完成程序的全部逻辑，在 `setup` 中既有需在在视图层使用的变量，又有为逻辑代码服务的变量，而后者并不需要被 Vue 时刻监听。所以，在 `setup` 中直接声明变量不会自动被标记为响应性数据。

### reactive

要为 JavaScript 对象创建响应式状态，可以使用 `reactive` 方法：

```javascript
<template>
  <h1>{{ data.title }}</h1>
</template>

<script>
  export default {
    setup() {
	  const data = reactive({
		title: "Hello, Vue 3!"
	  })
			
	  setTimeout(() => {
        data.title = "THIS IS A NEW TITLE";
      }, 5000);
		
      return { data };
    }
  };
</script>
```

### ref

如果只想为一个 JavaScript 的基本变量创建响应式状态，可以使用 `ref` 方法。但使用 `ref` 方法创建的变量，在 `JavaScript` 代码部分被调用时，需要使用 `.value` 来访问变量的值。

```javascript
<template>
  <h1>{{ title }}</h1>
</template>

<script>
  export default {
    setup() {
      const title = ref("Hello, Vue 3!");
	  
      setTimeout(() => {
        title.value = "THIS IS A NEW TITLE";
      }, 5000);
		
      return { title };
    }
  };
</script>
```

### 对象解构问题

当我们想使用某个大型响应式对象的一些属性时，或者想要在视图层中直接使用属性的名字而非`data.property` ，可以使用 ES6 的解构特性来满足我们的需要：

```javascript
<template>
  <h1>{{ title }}</h1>     
  <h2>{{ subTitle }}</h2>
</template>

<script>
  export default {
    setup() {
	  const data = reactive({
		title: "This is Title.",
		subTitle: "This is Subtitle."
	  })

	  let { title, subTitle } = data;			
      return { title, subTitle };
    }
  };
</script>
```

但是此时，解构得到的两个 property 的响应性都会丢失。对于这种情况，我们需要将响应式对象转换为一组 ref，再将这组 ref 进行解构，即可得到具有响应性的 property。

```javascript
<template>
  <h1>{{ title }}</h1>
  <h2>{{ subTitle }}</h2>
</template>

<script>
  export default {
    setup() {
	  const data = reactive({
		title: "This is Title.",
		subTitle: "This is Subtitle."
	  })

	  let { title, subTitle } = toRefs(data);			
      return { title, subTitle };
    }
  };
</script>
```

当一个对象中的 property 太多时，我们可以使用 ES6 中的 `...` 运算符进行结构：

```jsx
<script>
  export default {
    setup() {
	  const data = reactive({
		title: "This is Title.",
		subTitle: "This is Subtitle.",
		time: "2000-01-01",
		name: "vue"
	  })

	  const refData = toRefs(data);			
      return { ...refData  };
    }
  };
</script>
```