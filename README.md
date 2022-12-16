# alpine-ripple

`alpine-ripple` is a simple Alpine.js plugin that adds a ripple effect to any element with an alpine directive `x-ripple`.

## Installation

### CDN

Include the following `<script>` and `<link>` tags in the `<head>` of your document, just before Alpine.

```html
<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/wilkr/alpine-ripple@1.x.x/dist/alpine-ripple.css"
/>
<script
    src="https://cdn.jsdelivr.net/npm/wilkr/alpine-ripple@1.x.x/dist/alpine-ripple.js"
    defer
></script>
```

### NPM

```bash
npm i -S alpine-ripple
```

Add the `x-ripple` directive to your project by importing the package.

```js
import Alpine from "alpinejs";
import ripple from "alpine-ripple";

Alpine.plugin(ripple);

window.Alpine = Alpine;
window.Alpine.start();
```

Import the package styles into your css.

```css
@import "alpine-ripple/dist/alpine-ripple.css";
```

## Usage

Add the `x-ripple` directive to any element, which in most cases will be a `<button>`.

```html
<button x-data x-ripple>Click me</button>
```

This will result in a ripple effect when the button is clicked. By default, the ripple will be white, but this can be changed globally or on a per element basis.

## Options

Certain aspects of the ripple effect can easily be customized for this package. Some options can be set globally via css, or on a per element basis.

### Color

By default, the ripple color is white, which should work for most cases. However, if you want to change the color, you have multiple options:

#### Global

If you want to change the color globally, you can do so by setting the `--ripple-color` css variable. This should be done in your app css file.

```css
:root {
    --ripple-color: #000;
}
```

You may define the color with any valid hex value or rgb value.

> **Tip:** Be sure your css file is after the `alpine-ripple.css` file for the change to take effect.

#### Per Element

If you want to change the color for a specific element, you can do so by using the `color` modifier on the directive.

```html
<button x-data x-ripple.color.#000>Click me</button>
```

This will result in a black ripple effect when the button is clicked. If you're using Tailwind, you may define a color class and use that instead.

```html
<button x-data x-ripple.color.green-500>Click me</button>
```

This will result in the ripple element getting the `!bg-green-500` class added to it. `!` is added to the class to specify that is important, so it overrides any other styles. To prevent Tailwind from purging your color classes, you should be sure to add them to your `safeList` in your `tailwind.config.js` file if you're not using them anywhere else.

### Radius

By default, the ripple radius is 9999px, but you may make it more or less to suit your needs.

#### Global

If you want to change the radius globally, you can do so by setting the `--ripple-radius` css variable. This should be done in your app css file.

```css
:root {
    --ripple-radius: 5%;
}
```

Now the ripple radius will be 5% instead.

#### Per Element

If you want to change the radius for a specific element, you can do so by using the `radius` modifier on the directive.

```html
<button x-data x-ripple.radius.5rem>Click me</button>
```

This button will now have a ripple radius of 5rem. Any valid css unit can be used. If one is omitted, we will assume a unit of `%`. If you want to use a decimal value, you may define it with an underscore, like this:

```html
<button x-data x-ripple.radius.5_5%>Click me</button>
```

This will give the ripple a radius of 5.5%.

### Duration

By default, the ripple duration is 600ms, but you may make it more or less to suit your needs.

#### Global

If you want to change the duration globally, you can do so by setting the `--ripple-duration` css variable. This should be done in your app css file.

```css
:root {
    --ripple-duration: 1000ms;
}
```

### Timing Function

By default, the ripple timing function is `linear`, but you may change it to suit your needs.

#### Global

If you want to change the timing function globally, you can do so by setting the `--ripple-timing-function` css variable. This should be done in your app css file.

```css
:root {
    --ripple-timing-function: ease-in-out;
}
```

## Advanced Usage

It is possible to chain multiple modifiers onto the `x-ripple` directive. Here is an example of changing the color to red, and the radius to 25%.

```html
<button x-data x-ripple.color.#ff0000.radius.25%>Click me</button>
```

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
