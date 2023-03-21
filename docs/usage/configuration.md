---
title: Configuration
sort: 4
---

## Introduction

If you are using the [npm installation](/docs/alpine-ripple/{version}/installation#user-content-npm) method for this package, you can use the `Ripple.configure()` method to set configuration options for the package.
In the example below, we will show the configuration options you may set, separated out by directive.

```js
import Ripple from '@wilkr/alpine-ripple';

Alpine.plugin(
    Ripple.configure({
        /**
         * x-ripple
         */
        
        // Specify your own class(es) for the ripple element.
        class: 'ripple',

        // Specify how long the ripple element should remain on the page
        // after the animation has finished.
        removeTimeout: 1000,

        /**
         * x-ripple-focus
         */
        
        // Specify your own class(es) for the ripple focus element.
        focusClass: 'ripple-focus',
        
        // Specify your own class(es) for the root element when it is focused.
        // The directive will use this class to determine when the element is focused.
        focusedClass: 'ripple-focus-active',
    })
);
```
