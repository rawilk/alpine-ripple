> ✨ Help support the maintenance of this package by [sponsoring me](https://github.com/sponsors/rawilk).

# alpine-ripple

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/rawilk/alpine-ripple?label=version&style=flat-square)
![Npm downloads](https://img.shields.io/npm/dt/@wilkr/alpine-ripple?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/rawilk/alpine-ripple?style=flat-square)

![social image](https://banners.beyondco.de/alpine-ripple.png?theme=light&packageManager=npm+install&packageName=%40wilkr%2Falpine-ripple&pattern=bubbles&style=style_1&description=Ripple+effect+%28materialize%29+for+Alpine.js.&md=1&showWatermark=0&fontSize=100px&images=sparkles)

`alpine-ripple` is a simple Alpine.js plugin that adds a ripple effect to any element with an alpine directive `x-ripple`.

## Requirements

-   Alpine.js v3.x
-   Tailwind CSS (only required if you want to use custom color classes on the directive)

## Installation

### CDN

Include the following `<script>` and `<link>` tags in the `<head>` of your document, just before Alpine.

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

### NPM

```bash
npm i -S @wilkr/alpine-ripple
```

Add the `x-ripple` directive to your project by importing the package.

```js
import Alpine from "alpinejs";
import Ripple from "@wilkr/alpine-ripple";

Alpine.plugin(Ripple);

window.Alpine = Alpine;
window.Alpine.start();
```

Import the package styles into your css.

```css
@import "@wilkr/alpine-ripple/dist/alpine-ripple.css";
```

## Usage

Add the `x-ripple` directive to any element, which in most cases will be a `<button>`.

```html
<button x-data x-ripple>Click me</button>
```

This will result in a ripple effect when the button is clicked. By default, the ripple will be white, but this can be changed globally or on a per-element basis.

## Documentation

More documentation can be found here: https://randallwilk.dev/docs/alpine-ripple

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email randall@randallwilk.dev instead of using the issue tracker.

## Credits

-   [Randall Wilk](https://github.com/rawilk)
-   [All Contributors](../../contributors)

`alpine-ripple` is heavily inspired from:

-   [alHasandev/tailwind-button](https://github.com/alHasandev/tailwind-button)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
