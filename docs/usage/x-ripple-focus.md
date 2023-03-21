---
title: X-Ripple-Focus
sort: 2
---

## Introduction

The `x-ripple-focus` directive can be attached to an element to provide a pulsating ripple effect when the element is focused. This directive is compatible
with the `x-ripple` directive, and can be used in conjunction with it.

```html
<button x-data x-ripple-focus>
    Focus me
</button>
```

When this button is focused, it will show a pulsating ripple effect.

> {note} For the `x-ripple-focus` directive to work, you must have the `x-data` directive applied to the element as well, or the element
> must be inside the scope of an `x-data` directive.

## Options

Certain aspects of the ripple focus effect can be customized for this package. Some options can be set [globally via CSS](/docs/alpine-ripple/{version}/usage d/global-customization), or on a per-element basis.

### Color

By default, the ripple focus color is white, which should work in most cases. However, if you want to change the color, you can do so with a `color` modifier.

```html
<button x-data x-ripple-focus.color.#000>
    Focus me
</button>
```

This will result in a black ripple focus effect when the button is focused. If you're using Tailwind, you may define a color class and use that instead.

```html
<button x-data x-ripple-focus.color.green-500>
    Focus me
</button>
```

This will result in the ripple focus element getting the `!bg-green-500` class added to it. `!` is added to the class to specify that it is important,
so it overrides any other styles. to prevent Tailwind from puring your color classes, you should be sure to add them to your `safelist` in your
`tailwind.config.js` file if you're not using them anywhere else.

> {note} If you're using the `x-ripple-focus` directive in conjunction with the `x-ripple` directive, the color of the ripple focus effect will default to
> the color of the ripple effect unless you specify a color for the ripple focus effect.

### Other Options

The rest of the options for the ripple focus effect are only able to be changed globally via CSS. See the [X-Ripple-Focus](/docs/alpine-ripple/{version}/usage/global-customization#user-content-x-ripple-focus) section
for more information.
