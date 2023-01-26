import rippleClick from './directives/click';
import rippleFocus from './directives/focus';

/**
 * Configuration options for the ripple directives.
 *
 * @type {{rippleClass: string, removeTimeout: number, focusClass: string, focusedClass: string}}
 */
const rippleConfig = {
    rippleClass: 'ripple',
    removeTimeout: 1000,
    focusClass: 'ripple-focus',
    focusedClass: 'ripple-focus-active',
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
};

export default Ripple;
