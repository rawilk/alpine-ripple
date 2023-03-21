---
title: Installation
sort: 3
---

## Installation

The package can be installed through npm or by using a CDN.

### NPM

```bash
npm i -S @wilkr/alpine-ripple
```

Add the `x-ripple` and `x-ripple-focus` directives to your project by importing the package.

```js
import Alpine from "alpinejs";
import Ripple from "@wilkr/alpine-ripple";

Alpine.plugin(Ripple);

window.Alpine = Alpine;
window.Alpine.start();
```

Import the package styles into your CSS.

```css
@import "@wilkr/alpine-ripple/dist/alpine-ripple.css";
```

### CDN

If CDNs are more your thing, you can include the following `<script>` and `<link>` tags in the `<head>` of your document, just before Alpine.

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@wilkr/alpine-ripple@1.x.x/dist/alpine-ripple.css"
/>
<script
    src="https://cdn.jsdelivr.net/npm/@wilkr/alpine-ripple@1.x.x/dist/alpine-ripple.min.js"
    defer
></script>
```
