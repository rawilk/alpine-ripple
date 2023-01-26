/**
 * Check if the keydown event is the enter key or the space bar.
 *
 * @param {KeyboardEvent} event
 * @returns {boolean}
 */
export const isEnterOrSpace = event => event.key === 'Enter' || event.key === ' ';
