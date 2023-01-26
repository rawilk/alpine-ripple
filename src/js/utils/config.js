/**
 * Convert a space separated class string to a valid css selector.
 *
 * @param {string} configClass
 * @returns {string}
 */
export const configClassToSelector = configClass => `.${configClass.replace(' ', '.')}`;

/**
 * Add a space separated class string to an element.
 *
 * @param {HTMLElement} el
 * @param {string} configClass
 */
export const addConfigClassToElement = (el, configClass) => configClass.split(' ').forEach(c => el.classList.add(c));

/**
 * Remove a space separated class string from an element.
 *
 * @param {HTMLElement} el
 * @param {string} configClass
 */
export const removeConfigClassFromElement = (el, configClass) => configClass.split(' ').forEach(c => el.classList.remove(c));
