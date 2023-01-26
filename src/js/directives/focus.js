import {
    addConfigClassToElement,
    configClassToSelector,
    getCustomColorFromModifiers,
    removeConfigClassFromElement,
    startRipple,
    toStyles,
} from '../utils';

/**
 * Determine if the element is being focused from a click or tab.
 * This isn't the best way to do this, but it works for now.
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
const isFromTab = el => ! el.hasAttribute('data-ripple-click');

/**
 * Configuration options for the ripple focus directive.
 *
 * @type {{focusClass: string, focusedClass: string}}
 */
let config = {
    focusClass: 'ripple-focus',
    focusedClass: 'ripple-focus-active',
};

/**
 * Add a pulsating ripple effect to the element when it is focused.
 *
 * @param {Event} event
 * @param {HTMLElement} el
 * @param {array} modifiers
 */
export const addRippleFocus = (event, el, modifiers = []) => {
    if (! isFromTab(el)) {
        event.preventDefault();

        return;
    }

    const rippleStyles = startRipple(event, el, { pulsate: true });

    const rippleFocus = document.createElement('span');
    addConfigClassToElement(rippleFocus, config.focusClass);

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

    addConfigClassToElement(el, config.focusedClass);
};

/**
 * Remove the ripple focus effect from the element.
 *
 * @param {HTMLElement} el
 */
export const removeRippleFocus = el => {
    el.hasAttribute('data-ripple-click') && el.removeAttribute('data-ripple-click');

    try {
        removeConfigClassFromElement(el, config.focusedClass);
    } catch (e) {}

    const ripple = el.querySelector(configClassToSelector(config.focusClass));

    ripple && ripple.remove();
};

/**
 * Add a data attribute to the element so we know it was clicked instead of keyboard focused.
 *
 * @param {HTMLElement} el
 */
export const rippleFocusClick = el => {
    el.setAttribute('data-ripple-click', 'true');
};

/**
 * Remove our click data attribute from the element.
 *
 * @param {HTMLElement} el
 * @returns {false|void}
 */
export const rippleFocusMouseUp = el => el.hasAttribute('data-ripple-click') && el.removeAttribute('data-ripple-click');

export default (Alpine, rippleConfig) => {
    config = { ...config, ...rippleConfig };

    Alpine.directive('ripple-focus', (el, { modifiers, expression }, { cleanup }) => {
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
};
