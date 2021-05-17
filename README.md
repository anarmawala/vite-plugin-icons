<img src="https://img.shields.io/npm/v/@anarmawala/vite-plugin-icons?style=flat-square">
<img src="https://img.shields.io/npm/l/@anarmawala/vite-plugin-icons?style=flat-square">
<img src="https://img.shields.io/github/issues/anarmawala/vite-plugin-icons?style=flat-square">
<img src="https://img.shields.io/github/issues-pr/anarmawala/vite-plugin-icons?style=flat-square">

# @anarmawala/vite-plugin-icons

Simple and straightforward icon generation tool for web applications using Vite
## Features
 - Create PNG icon file in multiple sizes from a single SVG File
 - Custom icon name prefixing
 - Automatically injects icon links into the HTML
 - **WIP:** Allowing for custom sizing and naming
## Usage
**Install the package through NPM or Yarn:**

`npm i @anarmawala/vite-plugin-icons`
or
`yarn add @anarmawala/vite-plugin-icons` if you are using Yarn.

**Add it to your `vite.config.js`**

```ts
// vite.config.js
import { LoadIcon } from '@anarmawala/vite-plugin-icons'

export default {
  plugins: [
    // ... other plugins
    LoadIcon({src: path.resolve(__dirname, 'logo.svg')})
  ]
}
```

## License
MIT License © 2021 [Arshad Narmawala](https://github.com/anarmawala)