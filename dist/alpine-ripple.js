(function(f){typeof define==='function'&&define.amd?define(f):f();})((function(){'use strict';const getCustomColorFromModifiers = modifiers => {
  if (!modifiers.includes('color')) {
    return '';
  }
  const nextModifier = modifiers[modifiers.indexOf('color') + 1] || 'invalid-color';
  if (nextModifier.indexOf('#') === 0 || nextModifier.indexOf('rgb') === 0) {
    return nextModifier;
  }
  return nextModifier.indexOf('bg') === 0 ? nextModifier : `bg-${nextModifier}`;
};
const getCustomRadiusFromModifiers = modifiers => {
  if (!modifiers.includes('radius')) {
    return '';
  }
  let nextModifier = modifiers[modifiers.indexOf('radius') + 1] || 'invalid-radius';

  // _ allows us to use decimals, such as 0.5.
  nextModifier = nextModifier.replace('_', '.');

  // Separate the numeric value from the unit in nextModifier.
  // Possible values for nextModifier: 50, 50.5, 50.5px, 50px, 50%, 50rem, 50em
  const numericValue = nextModifier.match(/^[0-9]+(\.[0-9]+)?/)[0];
  let unit = nextModifier.replace(numericValue, '');
  if (!unit) {
    unit = '%';
  }
  return `${numericValue}${unit}`;
};

/**
 * Convert an object of style properties to a string of CSS.
 *
 * @param {Object} styles
 * @returns {string}
 */
const toStyles = styles => Object.entries(styles).map(([key, value]) => `${formatStyleKey(key)}: ${value}`).join(';');

/**
 * Convert a style key to a CSS property.
 * Example: backgroundColor -> background-color
 *
 * @param {string} key
 * @returns {string}
 */
const formatStyleKey = key => key.replace(/([A-Z])/g, '-$1').toLowerCase();

/**
 * Some events, such as a right click or ctrl + left click won't trigger a mouseup event,
 * so we need to prevent the ripple from being added in those cases.
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
const willHaveAMouseUpEvent = event => {
  if (event.ctrlKey) {
    return false;
  }
  return event.button === 0 || event.button === 1;
};let rippleClass = 'ripple';
let removeTimeout = 1000;

/**
 * Add a ripple effect to the element.
 *
 * @param {MouseEvent} event
 * @param {HTMLElement} el
 * @param {Array} modifiers
 */
const addRipple = (event, el, modifiers) => {
  if (!willHaveAMouseUpEvent(event)) {
    return;
  }
  const ripple = document.createElement('span');
  rippleClass.split(' ').forEach(className => ripple.classList.add(className));
  el.appendChild(ripple);
  const size = ripple.offsetWidth,
    position = ripple.getBoundingClientRect(),
    innerRipple = document.createElement('span');
  const x = event.pageX - position.left - size / 2,
    y = event.pageY - position.top - size / 2;
  const style = {
    top: `${y}px`,
    left: `${x}px`,
    width: `${size}px`,
    height: `${size}px`
  };
  const color = getCustomColorFromModifiers(modifiers);
  if (color.indexOf('bg-') === 0) {
    // Prefix with '!' for !important (requires Tailwind).
    innerRipple.classList.add(`!${color}`);
  } else if (color.indexOf('#') === 0 || color.indexOf('rgb') === 0) {
    style['--ripple-color'] = color;
  }
  const radius = getCustomRadiusFromModifiers(modifiers);
  if (radius) {
    style['--ripple-radius'] = radius;
  }
  ripple.appendChild(innerRipple);
  innerRipple.setAttribute('style', toStyles(style));
};

/**
 * Remove the ripple from the element.
 *
 * @param {HTMLElement} el
 */
const removeRipple = el => {
  setTimeout(() => {
    // We are only removing the first instance to prevent ripples from subsequent clicks
    // being removed too quickly before the ripple effect can properly be seen.
    const ripple = el.querySelector(`.${rippleClass.replace(' ', '.')}`);
    ripple && ripple.remove();
  }, removeTimeout);
};
function Ripple(Alpine) {
  Alpine.directive('ripple', (el, {
    modifiers,
    expression
  }, {
    cleanup
  }) => {
    const clickHandler = event => addRipple(event, el, modifiers);
    const mouseUpHandler = () => removeRipple(el);
    el.addEventListener('mousedown', clickHandler);
    el.addEventListener('mouseup', mouseUpHandler);
    cleanup(() => {
      el.removeEventListener('mousedown', clickHandler);
      el.removeEventListener('mouseup', mouseUpHandler);
    });
  });
}
Ripple.configure = config => {
  if (config.hasOwnProperty('class') && typeof config.class === 'string') {
    rippleClass = config.class;
  }
  if (config.hasOwnProperty('removeTimeout') && typeof config.removeTimeout === 'number') {
    removeTimeout = config.removeTimeout;
  }
  return Ripple;
};document.addEventListener('alpine:initializing', () => {
  Ripple(window.Alpine);
});}));//# sourceMappingURL=alpine-ripple.js.map
