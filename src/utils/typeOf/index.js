/**
 * Returns the type of the provided object as a lowercase string.
 * @param {*} obj - Any value to identify the type.
 * @returns {string} Type of the object (e.g., 'string', 'number', 'array', etc).
 */
export function typeOf(obj) {
  const typeString = Object.prototype.toString.call(obj);

  const typeName = typeString.slice(8, -1);

  return typeName.toLowerCase();
}
