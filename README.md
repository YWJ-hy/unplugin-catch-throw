# unplugin-catch-throw

如果你的项目中存在catch捕获异常，但是又未把这个异常抛出，导致项目出现问题无法排查

如果你在做前端监控 - promise异常捕获

当前插件通过在try/catch块或者promise.catch插入Promise.reject，把异常抛出

## Install

```bash
npm i unplugin-catch-throw -D
```

## ⚙️ Options

```ts
interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
}
```

## 支持注释排除处理(try/catch 支持两种注释方式，new Promise仅支持内联注释)

```ts
/*! @ignore_catch_throw */
try {
  throw new Error('ignore comment')
}
catch (err) {
  // test
}
try {
  throw new Error('ignore comment')
}
catch (err) {
  /*! @ignore_catch_throw */
}
new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('ignore comment'))
  })
}).catch(() => {
  /*! @ignore_catch_throw */
})
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import CatchThrow from 'unplugin-catch-throw/vite'

export default defineConfig({
  plugins: [
    CatchThrow({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import CatchThrow from 'unplugin-catch-throw/rollup'

export default {
  plugins: [
    CatchThrow({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-catch-throw/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-catch-throw/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-catch-throw/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import CatchThrow from 'unplugin-catch-throw/esbuild'

build({
  plugins: [CatchThrow()],
})
```

<br></details>
