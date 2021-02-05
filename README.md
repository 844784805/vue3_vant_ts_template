# vue3_vant_ts_template

<a name="H8MIE"></a>
### Vant配置

---

- **安装**
```vue
npm i vant@next -S
```


- **使用 `ts-import-plugin` 实现vant按需导入**
> * 当本地找不到 `webpack-merge` 和 `ts-import-plugin` 时，需要分别安装
> - npm i webpack-merge
> - npm i ts-import-plugin


<br />`vue.config.js` 中
```javascript
/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  }
}

```


- **注册需要使用的vant全局组件，实现单独文件统一管理**
> 项目根目录新建 `plugins` / `vant.ts`

```javascript
import { App } from 'vue'
import { Button } from 'vant'

const plugins = [Button]

const vant = {
  install: function (app: App<Element>) {
    plugins.forEach(item => {
      app.component(item.name, item)
    })
  }
}

export default vant

```

- **`main.ts` 中导入**
```javascript
import vant from '@/plugins/vant'
createApp(App)
	...// 其他配置
  .use(vant)
  .mount('#app')
```


- **定制主题**
> 官方文档：[https://vant-contrib.gitee.io/vant/next/#/zh-CN/theme#an-xu-yin-ru-yang-shi-tui-jian](https://vant-contrib.gitee.io/vant/next/#/zh-CN/theme#an-xu-yin-ru-yang-shi-tui-jian)


<br />项目根目录新建 `theme / vat.less`, 从vant官网下载需要的主题进行定制<br />
<br />`vue.config.js` 中
```javascript
const path = require('path')

module.exports = {
  // 这里是重新覆盖 上面已经配置了的按需加载
   chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              // 按需导入vant插件
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                // 指定样式的路径
                style: name => `${name}/style/less`
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },
  css: {
    // 配置 less主题
      less: {
        modifyVars: {
          // 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.join(__dirname, './src/theme/var.less')}";`
        }
      }
  }
}
```


<a name="qfoD9"></a>
### 移动端适配方案（vw/vh）

---

- **安装**
```javascript
npm install postcss-px-to-viewport -D
```

<br />`vue.config.js` 中, 此处配置后，需要重新运行项目，vw/vh适配方案才生效
```javascript
const pxtoviewport = require("postcss-px-to-viewport");
const autoprefixer = require("autoprefixer");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
          })
        ]
      }
    }
  }
}
```

<br />

<a name="vYAgK"></a>
### 浏览器样式重置

---

- **安装**
```javascript
npm install --save normalize.css
```


- `**main.ts**`**中引入**
```javascript
import 'normalize.css/normalize.css' 
```
> 自定义的 `reset.css` ， 可存放在` src/assets/style` 中，然后再`main.ts`中引入
> import  '@/assets/style/reset.css'


<br />

<a name="CKN60"></a>
### 移动端 `1px` 边框

---

- 问题分析：有些手机的屏幕分辨率较高，是2-3倍屏幕。css样式中`border:1px solid red;`在2倍屏下，显示的并不是1个物理像素，而是2个物理像素。解决方案如下：
- 利用 css 的 伪元素`::after` +` transfrom` 进行缩放。为什么用伪元素？ 因为伪元素`::after`或`::before`是独立于当前元素，可以单独对其缩放而不影响元素本身的缩放
> 因为vant使用的`less`, 所以这里我也使用 `less` 进行编写

```less
//单边border样式
.border1px(@color, @after) {
  position: relative;
  border: none;
  &&::after {
    content: '';
    position: absolute;
    background: @color;
    @after();
  }
}
.border1px-top() {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform: scaleY(0.5);
  transform-origin: 0 top;
}
.border1px-right() {
  right: 0;
  top: 0;
  height: 100%;
  width: 2px;
  transform: scaleX(0.5);
  transform-origin: right 0;
}
.border1px-bottom() {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform: scaleY(0.5);
  transform-origin: 0 bottom;
}
.border1px-left() {
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  transform: scaleX(0.5);
  transform-origin: left 0;
}
.border-1px (@color:#ccc, @direction) when (@direction = top) {
  .border1px(@color, .border1px-top());
}
.border-1px (@color:#ccc, @direction) when (@direction = right) {
  .border1px(@color, .border1px-right());
}
.border-1px (@color:#ccc, @direction) when (@direction = bottom) {
  .border1px(@color, .border1px-bottom());
}
.border-1px (@color:#ccc, @direction) when (@direction = left) {
  .border1px(@color, .border1px-left());
}

// 四边border样式
.all-border-1px (@color:#ccc, @radius) {
  position: relative;
  border: none;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid @color;
    border-radius: @radius * 2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
  }
}

```

- **使用**
> 自定义 `mixin.less` ， 可存放在` src/assets/style` 中，然后再组件`<style></style>`中引入使用

```less
@import "~@/assets/style/mixin.less";

// 例
#app {
	.all-border-1px(#ccc, 5px);
}
```


<a name="Rm1KF"></a>
### Swiper 6+ 配置

---

- 官方文档：[https://swiperjs.com/vue/#installation](https://swiperjs.com/vue/#installation)



- 安装
```javascript
npm i swiper
```


- 新建 `plugins / swiper.ts`
```javascript
import { App } from 'vue'

// swiper 额外组件配置
import SwiperCore, { Pagination } from 'swiper'

// swiper 单独样式 （less / scss）
import 'swiper/swiper.less'
import 'swiper/components/pagination/pagination.less'

// swiper 必备组件
import { Swiper, SwiperSlide } from 'swiper/vue'

// 使用额外组件
SwiperCore.use([Pagination])

// 全局注册 swiper 必备组件
const plugins = [Swiper, SwiperSlide]

const swiper = {
  install: function (app: App<Element>) {
    plugins.forEach(item => {
      app.component(item.name, item)
    })
  }
}

export default swiper

```

<br />*** 默认直接全局导入 必备组件， 会报错缺少声明文件。**<br />

- 项目根目录新建 `swiper-t.d.ts`
```javascript
declare module 'swiper/vue' {
  import _Vue from 'vue'
  export class Swiper extends _Vue {}
  export class SwiperSlide extends _Vue {}
}

```


- `main.ts`中导入
```javascript
import swiper from '@/plugins/swiper'
createApp(App)
	...// 其他配置
  .use(swiper)
  .mount('#app')
```


- 使用
> 直接在需要的地方使用即可，按照需求，自定义引入组件，配置组件，详细请看[官方文档](https://swiperjs.com/vue/#installation)

```vue
<template>
	<swiper :pagination="{ clickable: true }">
		<swiper-slide></swiper-slide>
	</swiper>	
</template>
```


### 感谢

---

[vue3-ts-template-h5](https://github.com/weizhanzhan/vue3-ts-template-h5)
