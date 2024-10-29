<div align="center">

# Vite plugin 消灭小css、合并css

<a href="LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
</a>
<a href="https://github.com/KongYanHHHH/vite-plugin-small-css-merged-into-js/issues">
  <img src="https://img.shields.io/github/issues/KongYanHHHH/vite-plugin-small-css-merged-into-js.svg" alt="Issues" />
</a>
<a href="https://npmjs.org/package/vite-plugin-small-css-merged-into-js">
  <img src="https://img.shields.io/npm/v/vite-plugin-small-css-merged-into-js.svg?style=flat-squar" alt="NPM" />
</a>
<a href="https://github.com/KongYanHHHH/vite-plugin-small-css-merged-into-js/releases">
  <img src="https://img.shields.io/github/release/KongYanHHHH/vite-plugin-small-css-merged-into-js.svg" alt="Latest Version" />
</a>

<p align="center">
  <strong>中文</strong> | <a href="./README.md">English</a>
</p>

</div>

## ⭐️ 功能

- 将小于规定字节数的css合并进所依赖的js中

## 📦 安装

```
# npm
npm install --save-dev vite-plugin-small-css-merged-into-js
# or yarn
yarn add vite-plugin-small-css-merged-into-js --dev
```

## 👨‍💻 使用

```js
// vite.config.js
import cssToJs from 'vite-plugin-small-css-merged-into-js';

export default {
  plugins: [cssToJs()],
};
```

### 🛠️ 配置

#### `size`

type: number
default: 1024
规定字节数

```js
export default {
  plugins: [cssToJs(2048)],
};
```

## 🤝 贡献

非常欢迎贡献和反馈。

To get it running:

1. Clone the project.
2. `npm install`
3. `npm run build`

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-author]: https://github.com/KongYanHHHH