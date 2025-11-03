export const extensions = [];

export function addExtension(extension) {
    if (typeof extension === 'function') {
        extensions.push(extension);
    } else {
        throw new Error('Extension must be a function');
    }
}

export function getExtensions() {
    return extensions;
}
