<div align="center">

# Vite plugin css merged into js

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
  <strong>English</strong> | <a href="./README.zh-CN.md">中文</a>
</p>

</div>

## ⭐️ Features

- Merges css smaller than a specified number of bytes into the dependent js

## 📦 Installation

```
# npm
npm install --save-dev vite-plugin-small-css-merged-into-js
# or yarn
yarn add vite-plugin-small-css-merged-into-js --dev
```

## 👨‍💻 Usage

```js
// vite.config.js
import cssToJs from 'vite-plugin-small-css-merged-into-js';

export default {
  plugins: [cssToJs()],
};
```

### 🛠️ Options

#### `size`

type: number
default: 1024
Specified bytes

```js
export default {
  plugins: [cssToJs(2048)],
};
```

## 🤝 Contributing

Contributions and feedback are very welcome.

To get it running:

1. Clone the project.
2. `npm install`
3. `npm run build`

## 📄 License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-author]: https://github.com/KongYanHHHH