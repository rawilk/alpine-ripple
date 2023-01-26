export const startRipple = (event, el, options = {}) => {
    const {
        center = options.pulsate,
    } = options;

    const rect = el.getBoundingClientRect();

    // Determine the size of the ripple.
    let rippleX,
        rippleY,
        rippleSize;

    if (
        center ||
        event === undefined ||
        (event.clientX === 0 && event.clientY === 0) ||
        (! event.clientX && ! event.touches)
    ) {
        // This is mostly used for the keyboard focus ripple.
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
    } else {
        const { clientX, clientY } = event.touches && event.touches.length > 0 ? event.touches[0] : event;

        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
    }

    if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);

        // For some reason the animation is broken on Mobile Chrome if the size is even.
        if (rippleSize % 2 === 0) {
            rippleSize++;
        }
    } else {
        const sizeX = Math.max(Math.abs((el ? el.clientWidth : 0) - rippleX), rippleX) * 2 + 2,
              sizeY = Math.max(Math.abs((el ? el.clientHeight : 0) - rippleY), rippleY) * 2 + 2;

        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
    }

    return {
        width: `${rippleSize}px`,
        height: `${rippleSize}px`,
        top: `${-(rippleSize / 2) + rippleY}px`,
        left: `${-(rippleSize / 2) + rippleX}px`,
    };
};
