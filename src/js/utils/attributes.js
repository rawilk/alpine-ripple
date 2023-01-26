/**
 * Get an attribute from an element that starts with a string.
 *
 * @param {HTMLElement} el
 * @param {string} startsWith
 * @returns {object|null}
 */
export const getAttributeThatStartsWith = (el, startsWith) => {
    for (const attr of el.attributes) {
        if (attr.name.startsWith(startsWith)) {
            return attr;
        }
    }

    return null;
};
