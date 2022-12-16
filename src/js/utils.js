export const getCustomColorFromModifiers = modifiers => {
    if (! modifiers.includes('color')) {
        return '';
    }

    const nextModifier = modifiers[modifiers.indexOf('color') + 1] || 'invalid-color';
    if (nextModifier.indexOf('#') === 0 || nextModifier.indexOf('rgb') === 0) {
        return nextModifier;
    }

    return nextModifier.indexOf('bg') === 0
        ? nextModifier
        : `bg-${nextModifier}`;
};

export const getCustomRadiusFromModifiers = modifiers => {
    if (! modifiers.includes('radius')) {
        return '';
    }

    let nextModifier = modifiers[modifiers.indexOf('radius') + 1] || 'invalid-radius';

    // _ allows us to use decimals, such as 0.5.
    nextModifier = nextModifier.replace('_', '.');

    // Separate the numeric value from the unit in nextModifier.
    // Possible values for nextModifier: 50, 50.5, 50.5px, 50px, 50%, 50rem, 50em
    const numericValue = nextModifier.match(/^[0-9]+(\.[0-9]+)?/)[0];
    let unit = nextModifier.replace(numericValue, '');
    if (! unit) {
        unit = '%';
    }

    return `${numericValue}${unit}`;
}

/**
 * Convert an object of style properties to a string of CSS.
 *
 * @param {Object} styles
 * @returns {string}
 */
export const toStyles = styles => Object.entries(styles).map(([key, value]) => `${formatStyleKey(key)}: ${value}`).join(';');

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
export const willHaveAMouseUpEvent = event => {
    if (event.ctrlKey) {
        return false;
    }

    return event.button === 0 || event.button === 1;
};
