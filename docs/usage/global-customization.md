---
title: Global Customization
sort: 3
---

## Introduction

If you find yourself using the same options on multiple elements, you may find it better to modify those options globally via CSS. This way, you don't have to repeat yourself on every element.
Below is an explanation of how to modify each of the options for the directives globally.

> {tip} Be sure your CSS if located after the CSS for this package for any changes to take effect.

## X-Ripple

Below are the options for the `x-ripple` directive that can be modified globally.

### Color

If you want to change the color globally, you can do so by setting the `--ripple-color` CSS variable. The best place to do this in your app CSS file in a `:root` selector.
You may define the color with any valid hex or rgb value.

```css
:root {
    --ripple-color: #000;
}
```

### Radius

By default, the ripple radius is 9999px, but you may make it more or less to suit your needs. To change it globally, you can set the `--ripple-radius` CSS variable in your app CSS file.

```css
:root {
    --ripple-radius: 5%;
}
```

Now the ripple radius will be 5% instead.

### Duration

By default, the ripple duration is 600ms, but you may make it more or less to suit your needs. To change it globally, you can set the `--ripple-duration` CSS variable in your app CSS file.

```css
:root {
    --ripple-duration: 1000ms;
}
```

### Timing Function

By default, the ripple timing function is `linear`, but you may change it to suit your needs by setting the `--ripple-timing-function` CSS variable in your app CSS file.

```css
:root {
    --ripple-timing-function: ease-in-out;
}
```

## X-Ripple-Focus

Below are the options for the `x-ripple-focus` directive that can be modified globally.

### Focus Color

If you want to change the color of the `x-ripple-focus` globally, you can do so by setting the `--ripple-focus-color` CSS variable in your app CSS file.
You may define the color with any valid hex or rgb value.

```css
:root {
    --ripple-focus-color: #000;
}
```

> {note} If you're using the `x-ripple` directives, you only need to set the `--ripple-color` CSS variable unless you want to use a different color for the `x-ripple-focus` directive.

### Animation

The `x-ripple-focus` directive uses a CSS animation to create a pulsating effect on the ripple focus element that gets appended inside your element when it is focused. There
are a few customizations you may make to the animation via CSS variables. Here are the defaults that are used for the animation.

```css
:root {
    --ripple-focus-duration: 2500ms;
    --ripple-focus-timing-function: ease-in-out;
    --ripple-focus-delay: 200ms;
}
```
