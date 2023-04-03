import {
    addConfigClassToElement,
    configClassToSelector,
    getAttributeThatStartsWith,
    getCustomColorFromModifiers,
    getCustomRadiusFromModifiers,
    isEnterOrSpace,
    startRipple,
    toStyles,
    willHaveAMouseUpEvent,
} from '../utils';
import { addRippleFocus, removeRippleFocus } from './focus';

/**
 * Configuration options for the ripple click directive.
 *
 * @type {{removeTimeout: number, rippleClass: string}}
 */
let config = {
    rippleClass: 'ripple',
    removeTimeout: 1000,
    focusedClass: 'ripple-focus-active', // So we can check if the element is focused by our directive.
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
export const addRipple = (event, el, modifiers = []) => {
    if (! willHaveAMouseUpEvent(event) && ! isEnterOrSpace(event)) {
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
export const removeRipple = (el, alsoRemoveFocus = false) => {
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
export const handleRippleKeydown = (event, el, modifiers) => {
    if (! isEnterOrSpace(event)) {
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
export default (Alpine, rippleConfig) => {
    config = { ...config, ...rippleConfig };

    Alpine.directive('ripple', (el, { modifiers, expression }, { cleanup }) => {
        const clickHandler = event => addRipple(event, el, modifiers);
        const mouseUpHandler = () => removeRipple(el, true);
        const keydownHandler = event => handleRippleKeydown(event, el, modifiers);
        const keyupHandler = event => isEnterOrSpace(event) && removeRipple(el, false);
        const passiveOptions = { passive: true };

        el.addEventListener('mousedown', clickHandler);
        el.addEventListener('mouseup', mouseUpHandler);
        el.addEventListener('mouseleave', mouseUpHandler);
        el.addEventListener('contextmenu', mouseUpHandler);
        el.addEventListener('touchstart', clickHandler, passiveOptions);
        el.addEventListener('touchend', mouseUpHandler);
        el.addEventListener('touchmove', mouseUpHandler, passiveOptions);
        el.addEventListener('dragleave', mouseUpHandler);
        el.addEventListener('keydown', keydownHandler);
        el.addEventListener('keyup', keyupHandler);

        cleanup(() => {
            el.removeEventListener('mousedown', clickHandler);
            el.removeEventListener('mouseup', mouseUpHandler);
            el.removeEventListener('mouseleave', mouseUpHandler);
            el.removeEventListener('contextmenu', mouseUpHandler);
            el.removeEventListener('touchstart', clickHandler, passiveOptions);
            el.removeEventListener('touchend', mouseUpHandler);
            el.removeEventListener('touchmove', mouseUpHandler, passiveOptions);
            el.removeEventListener('dragleave', mouseUpHandler);
            el.removeEventListener('keydown', keydownHandler);
            el.removeEventListener('keyup', keyupHandler);
        });
    });
};
