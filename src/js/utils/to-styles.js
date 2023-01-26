/**
 * Convert an object of style properties to a string of CSS.
 *
 * @param {object} styles
 * @returns {string}
 */
export default styles => Object.entries(styles).map(([key, value]) => `${formatStyleKey(key)}: ${value}`).join(';');

/**
 * convert a style key to a css property.
 *
 * @param {string} key
 * @returns {string}
 */
const formatStyleKey = key => key.replace(/([A-Z])/g, '-$1').toLowerCase();
