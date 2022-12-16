import { getCustomColorFromModifiers, getCustomRadiusFromModifiers, willHaveAMouseUpEvent, toStyles } from './utils';

let rippleClass = 'ripple';
let removeTimeout = 1000;

/**
 * Add a ripple effect to the element.
 *
 * @param {MouseEvent} event
 * @param {HTMLElement} el
 * @param {Array} modifiers
 */
export const addRipple = (event, el, modifiers) => {
    if (! willHaveAMouseUpEvent(event)) {
        return;
    }

    const ripple = document.createElement('span');
    rippleClass.split(' ').forEach(className => ripple.classList.add(className));

    el.appendChild(ripple);

    const size = ripple.offsetWidth,
        position = ripple.getBoundingClientRect(),
        innerRipple = document.createElement('span');

    const x = event.pageX - position.left - (size / 2),
        y = event.pageY - position.top - (size / 2);

    const style = {
        top: `${y}px`,
        left: `${x}px`,
        width: `${size}px`,
        height: `${size}px`,
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
export const removeRipple = el => {
    setTimeout(() => {
        // We are only removing the first instance to prevent ripples from subsequent clicks
        // being removed too quickly before the ripple effect can properly be seen.
        const ripple = el.querySelector(`.${rippleClass.replace(' ', '.')}`);

        ripple && ripple.remove();
    }, removeTimeout);
};

function Ripple(Alpine) {
    Alpine.directive('ripple', (el, { modifiers, expression }, { cleanup }) => {
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
};

export default Ripple;
