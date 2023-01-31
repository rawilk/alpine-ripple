(function(f){typeof define==='function'&&define.amd?define(f):f();})((function(){'use strict';/**
 * Get an attribute from an element that starts with a string.
 *
 * @param {HTMLElement} el
 * @param {string} startsWith
 * @returns {object|null}
 */
const getAttributeThatStartsWith = (el, startsWith) => {
  for (const attr of el.attributes) {
    if (attr.name.startsWith(startsWith)) {
      return attr;
    }
  }
  return null;
};/**
 * Convert a space separated class string to a valid css selector.
 *
 * @param {string} configClass
 * @returns {string}
 */
const configClassToSelector = configClass => `.${configClass.replace(' ', '.')}`;

/**
 * Add a space separated class string to an element.
 *
 * @param {HTMLElement} el
 * @param {string} configClass
 */
const addConfigClassToElement = (el, configClass) => configClass.split(' ').forEach(c => el.classList.add(c));

/**
 * Remove a space separated class string from an element.
 *
 * @param {HTMLElement} el
 * @param {string} configClass
 */
const removeConfigClassFromElement = (el, configClass) => configClass.split(' ').forEach(c => el.classList.remove(c));/**
 * Check if the keydown event is the enter key or the space bar.
 *
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
const isEnterOrSpace = event => event.key === 'Enter' || event.key === ' ';/**
 * Return a user defined custom color for the ripple effect.
 *
 * @param {Array} modifiers
 * @returns {string}
 */
const getCustomColorFromModifiers = modifiers => {
  if (!modifiers.includes('color')) {
    return '';
  }
  const nextModifier = modifiers[modifiers.indexOf('color') + 1] || 'invalid-color';
  if (nextModifier.indexOf('#') === 0 || nextModifier.indexOf('rgb') === 0) {
    return nextModifier;
  }
  return nextModifier.indexOf('bg') === 0 ? nextModifier : `bg-${nextModifier}`;
};

/**
 * Return a user defined custom radius for the ripple effect.
 *
 * @param {Array} modifiers
 * @returns {string}
 */
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
};const startRipple = (event, el, options = {}) => {
  const {
    center = options.pulsate
  } = options;
  const rect = el.getBoundingClientRect();

  // Determine the size of the ripple.
  let rippleX, rippleY, rippleSize;
  if (center || event === undefined || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
    // This is mostly used for the keyboard focus ripple.
    rippleX = Math.round(rect.width / 2);
    rippleY = Math.round(rect.height / 2);
  } else {
    const {
      clientX,
      clientY
    } = event.touches && event.touches.length > 0 ? event.touches[0] : event;
    rippleX = Math.round(clientX - rect.left);
    rippleY = Math.round(clientY - rect.top);
  }
  if (center) {
    rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

    // For some reason the animation is broken on Mobile Chrome if the size is even.
    if (rippleSize % 2 === 0) {
      rippleSize++;
    }
  } else {
    const sizeX = Math.max(Math.abs((el ? el.clientWidth : 0) - rippleX), rippleX) * 2 + 2,
      sizeY = Math.max(Math.abs((el ? el.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
    rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
  }
  return {
    width: `${rippleSize}px`,
    height: `${rippleSize}px`,
    top: `${-(rippleSize / 2) + rippleY}px`,
    left: `${-(rippleSize / 2) + rippleX}px`
  };
};/**
 * Convert an object of style properties to a string of CSS.
 *
 * @param {object} styles
 * @returns {string}
 */
var toStyles = (styles => Object.entries(styles).map(([key, value]) => `${formatStyleKey(key)}: ${value}`).join(';'));

/**
 * convert a style key to a css property.
 *
 * @param {string} key
 * @returns {string}
 */
const formatStyleKey = key => key.replace(/([A-Z])/g, '-$1').toLowerCase();/**
 * Some events, such as a right click or ctrl + left click won't trigger a mouseup event,
 * so we need to prevent the ripple from being added in those cases.
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
var willHaveAMouseUpEvent = (event => {
  if (event.ctrlKey) {
    return false;
  }
  return event.button === 0 || event.button === 1;
});/**
 * Determine if the element is being focused from a click or tab.
 * This isn't the best way to do this, but it works for now.
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
const isFromTab = el => !el.hasAttribute('data-ripple-click');

/**
 * Configuration options for the ripple focus directive.
 *
 * @type {{focusClass: string, focusedClass: string}}
 */
let config$1 = {
  focusClass: 'ripple-focus',
  focusedClass: 'ripple-focus-active'
};

/**
 * Add a pulsating ripple effect to the element when it is focused.
 *
 * @param {Event} event
 * @param {HTMLElement} el
 * @param {array} modifiers
 */
const addRippleFocus = (event, el, modifiers = []) => {
  if (!isFromTab(el)) {
    event.preventDefault();
    return;
  }
  const rippleStyles = startRipple(event, el, {
    pulsate: true
  });
  const rippleFocus = document.createElement('span');
  addConfigClassToElement(rippleFocus, config$1.focusClass);
  el.appendChild(rippleFocus);
  const rippleFocusChild = document.createElement('span');
  rippleFocusChild.classList.add('ripple-focus-child');
  const color = getCustomColorFromModifiers(modifiers);
  if (color.indexOf('bg-') === 0) {
    // Prefix with '!' for !important (requires Tailwind).
    rippleFocusChild.classList.add(`!${color}`);
  } else if (color.indexOf('#') === 0 || color.indexOf('rgb') === 0) {
    rippleStyles['--ripple-focus-color'] = color;
  }
  rippleFocusChild.setAttribute('style', toStyles(rippleStyles));
  rippleFocusChild.appendChild(document.createElement('span'));
  rippleFocus.appendChild(rippleFocusChild);
  addConfigClassToElement(el, config$1.focusedClass);
};

/**
 * Remove the ripple focus effect from the element.
 *
 * @param {HTMLElement} el
 */
const removeRippleFocus = el => {
  el.hasAttribute('data-ripple-click') && el.removeAttribute('data-ripple-click');
  try {
    removeConfigClassFromElement(el, config$1.focusedClass);
  } catch (e) {}
  const ripple = el.querySelector(configClassToSelector(config$1.focusClass));
  ripple && ripple.remove();
};

/**
 * Add a data attribute to the element so we know it was clicked instead of keyboard focused.
 *
 * @param {HTMLElement} el
 */
const rippleFocusClick = el => {
  el.setAttribute('data-ripple-click', 'true');
};

/**
 * Remove our click data attribute from the element.
 *
 * @param {HTMLElement} el
 * @returns {false|void}
 */
const rippleFocusMouseUp = el => el.hasAttribute('data-ripple-click') && el.removeAttribute('data-ripple-click');
var rippleFocus = ((Alpine, rippleConfig) => {
  config$1 = {
    ...config$1,
    ...rippleConfig
  };
  Alpine.directive('ripple-focus', (el, {
    modifiers,
    expression
  }, {
    cleanup
  }) => {
    const clickHandler = () => rippleFocusClick(el);
    const mouseUpHandler = () => rippleFocusMouseUp(el);
    const focusHandler = event => addRippleFocus(event, el, modifiers);
    const blurHandler = () => removeRippleFocus(el);

    /*
     * We need a way to know if we are giving focus to the element by clicking or tabbing.
     * Since there isn't a reliable way to do this with the focus event and the `mousedown`
     * event is fired before the `focus` event, we will set a data attribute on the element
     * that we can check for in the `focus` event.
     *
     * This way, we don't show our pulsating ripple animation when the user clicks on the
     * element, but only show it when the user tabs to the element.
     */
    el.addEventListener('mousedown', clickHandler);
    el.addEventListener('mouseup', mouseUpHandler);
    el.addEventListener('contextmenu', clickHandler);
    el.addEventListener('focus', focusHandler);
    el.addEventListener('blur', blurHandler);
    cleanup(() => {
      el.removeEventListener('mousedown', clickHandler);
      el.removeEventListener('mouseup', mouseUpHandler);
      el.removeEventListener('contextmenu', clickHandler);
      el.removeEventListener('focus', focusHandler);
      el.removeEventListener('blur', blurHandler);
    });
  });
});/**
 * Configuration options for the ripple click directive.
 *
 * @type {{removeTimeout: number, rippleClass: string}}
 */
let config = {
  rippleClass: 'ripple',
  removeTimeout: 1000,
  focusedClass: 'ripple-focus-active' // So we can check if the element is focused by our directive.
};

/**
 * Check if the element has the focused class.
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
const hasRippleFocus = el => config.focusedClass.split(' ').every(className => el.classList.contains(className));

/**
 * Add a ripple effect to the element.
 *
 * @param {MouseEvent|KeyboardEvent} event
 * @param {HTMLElement} el
 * @param {Array} modifiers
 */
const addRipple = (event, el, modifiers = []) => {
  if (!willHaveAMouseUpEvent(event) && !isEnterOrSpace(event)) {
    return;
  }
  const styles = startRipple(event, el);
  const ripple = document.createElement('span');
  addConfigClassToElement(ripple, config.rippleClass);
  el.appendChild(ripple);
  const innerRipple = document.createElement('span');
  const color = getCustomColorFromModifiers(modifiers);
  if (color.indexOf('bg-') === 0) {
    // Prefix with '!' for !important (requires Tailwind).
    innerRipple.classList.add(`!${color}`);
  } else if (color.indexOf('#') === 0 || color.indexOf('rgb') === 0) {
    styles['--ripple-color'] = color;
  }
  const radius = getCustomRadiusFromModifiers(modifiers);
  if (radius) {
    styles['--ripple-radius'] = radius;
  }
  ripple.appendChild(innerRipple);
  innerRipple.setAttribute('style', toStyles(styles));
};

/**
 * Remove the ripple effect from the element.
 *
 * @param {HTMLElement} el
 * @param {boolean} alsoRemoveFocus
 */
const removeRipple = (el, alsoRemoveFocus = false) => {
  alsoRemoveFocus && removeRippleFocus(el);
  setTimeout(() => {
    // We are only removing the first instance to prevent ripples from subsequent clicks
    // being removed too quickly before the ripple effect can properly be seen.
    const ripple = el.querySelector(configClassToSelector(config.rippleClass));
    ripple && ripple.remove();
  }, config.removeTimeout);
};

/**
 * Show a ripple effect when the user presses the enter or space key.
 *
 * @param {KeyboardEvent} event
 * @param {HTMLElement} el
 * @param {array} modifiers
 */
const handleRippleKeydown = (event, el, modifiers) => {
  if (!isEnterOrSpace(event)) {
    return;
  }
  const originallyHadFocus = hasRippleFocus(el);
  addRipple(event, el, modifiers);
  removeRippleFocus(el);
  if (originallyHadFocus) {
    addFocusBack(event, el);
  }
};

/**
 * Add a focus ripple effect back to the element after the ripple effect has been removed.
 *
 * @param {Event} event
 * @param {HTMLElement} el
 */
const addFocusBack = (event, el) => {
  const hasRippleClick = el.contains(el.querySelector(configClassToSelector(config.rippleClass)));
  if (hasRippleClick) {
    setTimeout(() => addFocusBack(event, el), config.removeTimeout);
    return;
  }

  // We need to get the modifiers, if any, from the x-ripple-focus directive.
  const directive = getAttributeThatStartsWith(el, 'x-ripple-focus');
  const focusModifiers = directive ? directive.name.split('.').slice(1) : [];
  addRippleFocus(event, el, focusModifiers);
};

/**
 * Define an Alpine directive that adds a ripple click effect to a given element.
 *
 * @param {Object} Alpine
 * @param {Object} rippleConfig
 */
var rippleClick = ((Alpine, rippleConfig) => {
  config = {
    ...config,
    ...rippleConfig
  };
  Alpine.directive('ripple', (el, {
    modifiers,
    expression
  }, {
    cleanup
  }) => {
    const clickHandler = event => addRipple(event, el, modifiers);
    const mouseUpHandler = () => removeRipple(el, true);
    const keydownHandler = event => handleRippleKeydown(event, el, modifiers);
    const keyupHandler = event => isEnterOrSpace(event) && removeRipple(el, false);
    el.addEventListener('mousedown', clickHandler);
    el.addEventListener('mouseup', mouseUpHandler);
    el.addEventListener('mouseleave', mouseUpHandler);
    el.addEventListener('contextmenu', mouseUpHandler);
    el.addEventListener('touchstart', clickHandler);
    el.addEventListener('touchend', mouseUpHandler);
    el.addEventListener('touchmove', mouseUpHandler);
    el.addEventListener('dragleave', mouseUpHandler);
    el.addEventListener('keydown', keydownHandler);
    el.addEventListener('keyup', keyupHandler);
    cleanup(() => {
      el.removeEventListener('mousedown', clickHandler);
      el.removeEventListener('mouseup', mouseUpHandler);
      el.removeEventListener('mouseleave', mouseUpHandler);
      el.removeEventListener('contextmenu', mouseUpHandler);
      el.removeEventListener('touchstart', clickHandler);
      el.removeEventListener('touchend', mouseUpHandler);
      el.removeEventListener('touchmove', mouseUpHandler);
      el.removeEventListener('dragleave', mouseUpHandler);
      el.removeEventListener('keydown', keydownHandler);
      el.removeEventListener('keyup', keyupHandler);
    });
  });
});/**
 * Configuration options for the ripple directives.
 *
 * @type {{rippleClass: string, removeTimeout: number, focusClass: string, focusedClass: string}}
 */
const rippleConfig = {
  rippleClass: 'ripple',
  removeTimeout: 1000,
  focusClass: 'ripple-focus',
  focusedClass: 'ripple-focus-active'
};
function Ripple(Alpine) {
  rippleClick(Alpine, rippleConfig);
  rippleFocus(Alpine, rippleConfig);
}
Ripple.configure = config => {
  if (config.hasOwnProperty('class') && typeof config.class === 'string') {
    rippleConfig.rippleClass = config.class;
  }
  if (config.hasOwnProperty('removeTimeout') && typeof config.removeTimeout === 'number') {
    rippleConfig.removeTimeout = config.removeTimeout;
  }
  if (config.hasOwnProperty('focusClass') && typeof config.focusClass === 'string') {
    rippleConfig.focusClass = config.focusClass;
  }
  if (config.hasOwnProperty('focusedClass') && typeof config.focusedClass === 'string') {
    rippleConfig.focusedClass = config.focusedClass;
  }
  return Ripple;
};document.addEventListener('alpine:initializing', () => {
  Ripple(window.Alpine);
});}));//# sourceMappingURL=alpine-ripple.js.map
