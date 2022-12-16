import ripple from '../src/js/ripple';
import '../src/css/styles.css';

document.addEventListener('alpine:initializing', () => {
    ripple(window.Alpine);
});
