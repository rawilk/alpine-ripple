/**
 * Some events, such as a right click or ctrl + left click won't trigger a mouseup event,
 * so we need to prevent the ripple from being added in those cases.
 *
 * @param {MouseEvent} event
 * @returns {boolean}
 */
export default event => {
    if (event.ctrlKey) {
        return false;
    }

    return event.button === 0 || event.button === 1;
};
