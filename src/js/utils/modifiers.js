/**
 * Return a user defined custom color for the ripple effect.
 *
 * @param {Array} modifiers
 * @returns {string}
 */
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

/**
 * Return a user defined custom radius for the ripple effect.
 *
 * @param {Array} modifiers
 * @returns {string}
 */
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
