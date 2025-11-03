import { iso8601RegexLenient, iso8601RegexStrict } from '../regexConstants.js';

/**
 * Validates if a string is (approximately) in ISO 8601 format
 * and represents a valid date/time.
 * @param {string} str - The string to validate.
 * @param {object} [options={}] - Options.
 * @param {boolean} [options.strict=false] - If true, requires full format with T, seconds, and timezone.
 * @returns {boolean} True if the format is valid AND the date is real.
 */
export function isValidISODateString(str, options = {}) {
    const defaults = {
        strict: false,
    };
    const opt = { ...defaults, ...options };

    const regex = opt.strict ? iso8601RegexStrict : iso8601RegexLenient;

    if (!regex.test(str)) {
        return false;
    }

    const date = new Date(str);
    if (isNaN(date.getTime())) {
        return false;
    }

    try {
        const yearStr = str.substring(0, 4);
        const monthStr = str.substring(5, 7);
        const dayStr = str.substring(8, 10);

        const dateYear = date.getUTCFullYear();
        const dateMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const dateDay = date.getUTCDate().toString().padStart(2, '0');

        if (yearStr !== dateYear.toString() || monthStr !== dateMonth || dayStr !== dateDay) {
            return false;
        }
    } catch {
        return false;
    }

    return true;
}
