---
title: X-Ripple
sort: 1
---

## Introduction

The `x-ripple` directive is the main directive this package offers. It adds a ripple effect to any element with the directive applied to it.
In most cases, this will be a button, but you are free to use it on any element.

```html
<button type="button" x-data x-ripple>Click me</button>
```

This will result in a ripple effect when the button is clicked on. By default, the ripple effect will be white, but this can be
changed globally or on a per-element basis.

> {note} For the `x-ripple` directive to work, you must have the `x-data` directive applied to the element as well, or the element
> must be inside the scope of an `x-data` directive.

## Options

Certain aspects of the ripple effect can be customized for this package. Some options can be set [globally via CSS](/docs/alpine-ripple/{version}/usage/global-customization), or on a per-element basis.

### Color

By default, the ripple color is white, which should work in most cases. However, if you want to change the color, you can do so with a `color` modifier.

```html
<button x-data x-ripple.color.#000>Click me</button>
```

This will result in a black ripple effect when the button is clicked on. If you're using Tailwind, you may define a color class and use that instead.

```html
<button x-data x-ripple.color.green-500>Click me</button>
```

This will result in the ripple element getting the `!bg-green-500` class added to it. `!` is added to the class to specify that it is important,
so it overrides any other styles. to prevent Tailwind from puring your color classes, you should be sure to add them to your `safelist` in your
`tailwind.config.js` file if you're not using them anywhere else.

### Radius

By default, the ripple radius is set to `9999px`, but you may make it more or less to suit your needs. You can modify the radius with the `radius` modifier.

```html
<button x-data x-ripple.radius.5rem>Click me</button>
```

This button will now have a radius of 5rem. Any valid CSS unit can be used. If one is omitted, we will assume a unit of `%`. If you want to use a decimal value,
you may define it with an underscore, like this:

```html
<button x-data x-ripple.radius.5_5%>Click me</button>
```

This will give the ripple a radius of 5.5%.

### Duration

By default, the ripple duration is 600ms, but you may make it more or less to suit your needs, however the only way to do this is by setting it globally via CSS.
See the [Duration](/docs/alpine-ripple/{version}/usage/global-customization#user-content-duration) section for more information.

## Advanced Usage

It is possible to chain multiple modifiers onto the `x-ripple` directive. Here is an example of changing the color to red, and the radius to 25%.

```html
<button x-data x-ripple.color.#ff0000.radius.25%>Click me</button>
```
