// UMD entry wrapper: expose the default preconfigured instance as default
// and also export the class and named exports for consumers.
import { Forma, forma, formaBR } from './index.js';

// Re-export named symbols
export { Forma, forma, formaBR };

// When used in a browser via the UMD bundle, some bundlers populate an
// exports object on the global (e.g. window.forma = { default: ..., forma: ... }).
// To make the UMD behave as documented (window.forma === instance), set the
// actual instance onto the global object directly when available.
(function () {
    try {
        if (typeof globalThis !== 'undefined' && globalThis) {
            // Avoid overwriting if something else already set a proper instance
            if (!globalThis.forma || (globalThis.forma && globalThis.forma.default)) {
                globalThis.forma = forma;
            }
        }
    } catch {
        /* ignore non-critical failures */
    }
})();

// Default export should be the instance for browser convenience
export default forma;
