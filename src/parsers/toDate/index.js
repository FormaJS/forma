import { toString } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';
import { iso8601RegexLenient } from '../../utils/index.js';

/**
 * Parse an ISO 8601 date string strictly and return a Date if it matches.
 * This function first checks the input with a lenient ISO8601 regex and then
 * constructs a Date object and verifies that the year/month/day in the
 * original string match the UTC year/month/day produced by the Date to avoid
 * accepting invalid offsets or truncated values.
 * @param {string} str - The input string to parse (expected ISO 8601).
 * @returns {Date|null} A Date object when the string is a valid ISO 8601
 * representation, otherwise null.
 */
function _parseISO8601(str) {
  if (!iso8601RegexLenient.test(str)) {
    return null;
  }

  const date = new Date(str);
  if (isNaN(date.getTime())) {
    return null;
  }

  try {
    const yearStr = str.substring(0, 4);
    const monthStr = str.substring(5, 7);
    const dayStr = str.substring(8, 10);

    const dateYear = date.getUTCFullYear();
    const dateMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const dateDay = date.getUTCDate().toString().padStart(2, '0');

    if (yearStr !== dateYear.toString() || monthStr !== dateMonth || dayStr !== dateDay) {
      return null;
    }
  } catch {
    return null;
  }

  return date;
}

/**
 * Resolve a two-digit year into a full year using a sliding-window rule.
 * The logic maps two-digit years to the current century unless the two-digit
 * year is sufficiently greater than the current two-digit year + 30, in
 * which case it is mapped to the previous century. This mirrors common
 * heuristics for handling 2-digit year inputs.
 * @param {string} yearStr - A 2-digit year string (e.g. '23' or '99').
 * @returns {number} The resolved full year (e.g. 2023) or NaN if parsing fails.
 */
function _parseTwoDigitYear(yearStr) {
  const year = parseInt(yearStr, 10);
  if (isNaN(year)) return NaN;
  const currentYear = new Date().getFullYear();
  const currentCentury = Math.floor(currentYear / 100);
  const currentTwoDigitYear = currentYear % 100;
  if (year > currentTwoDigitYear + 30) {
    return (currentCentury - 1) * 100 + year;
  }
  return currentCentury * 100 + year;
}

/**
 * Parse a date string according to a provided format pattern.
 * Supported tokens in the format string:
 * - yyyy : 4-digit year
 * - yy   : 2-digit year (resolved via parseTwoDigitYear)
 * - mm   : 2-digit month
 * - m    : 1-2 digit month
 * - dd   : 2-digit day
 * - d    : 1-2 digit day
 * Separators (., /, -) are treated literally. The function validates that
 * the captured parts form a real UTC date and returns a Date in UTC.
 * @param {string} str - The date string to parse (e.g. '31/12/1999').
 * @param {string} format - The format pattern describing the string (e.g. 'dd/mm/yyyy').
 * @returns {Date|null} A Date (UTC) if parsing and validation succeed, otherwise null.
 */
function _parseDateByFormat(str, format) {
  try {
    // Build token order by scanning the format left-to-right so capture
    // groups are associated with the correct positions in the final regex.
    const tokenRegex = /(yyyy|yy|mm|m|dd|d|[./-])/g;
    const tokens = [];
    let m;
    while ((m = tokenRegex.exec(format)) !== null) {
      const t = m[1];
      if (t === 'yyyy' || t === 'yy') tokens.push('year');
      else if (t === 'mm' || t === 'm') tokens.push('month');
      else if (t === 'dd' || t === 'd') tokens.push('day');
      // separators are ignored for capture mapping
    }

    const regexPattern = format
      .replace(/([./-])/g, '\\$1')
      .replace(/yyyy/g, '(\\d{4})')
      .replace(/yy/g, '(\\d{2})')
      .replace(/mm/g, '(\\d{2})')
      .replace(/m/g, '(\\d{1,2})')
      .replace(/dd/g, '(\\d{2})')
      .replace(/d/g, '(\\d{1,2})');

    const regex = new RegExp(`^${regexPattern}$`);
    const match = str.match(regex);
    if (!match) return null;

    const dateParts = {};
    tokens.forEach((groupName, index) => {
      dateParts[groupName] = match[index + 1];
    });

    const year =
      dateParts.year.length === 2
        ? _parseTwoDigitYear(dateParts.year)
        : parseInt(dateParts.year, 10);
    const month = parseInt(dateParts.month, 10) - 1;
    const day = parseInt(dateParts.day, 10);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

    const date = new Date(Date.UTC(year, month, day, 0, 0, 0));
    if (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month &&
      date.getUTCDate() === day
    ) {
      return date;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Converts a string (ISO 8601 or locale format) into a Date object.
 * @param {string} str - The string to convert.
 * @param {object} [options={}] - Options (should include 'locale').
 * @returns {Date | null} Returns the Date object, or null on failure.
 */
export function toDate(str, options = {}) {
  if (typeof str !== 'string' && typeof str !== 'number') {
    return null;
  }

  const testStr = toString(str).trim();

  const isoDate = _parseISO8601(testStr);
  if (isoDate) {
    return isoDate;
  }

  const lang = options.locale;
  if (!lang) {
    return null;
  }

  const localeData = getLocaleData(lang);
  const dateRules = localeData?.date;

  if (!dateRules || !dateRules.format) {
    return null;
  }

  return _parseDateByFormat(testStr, dateRules.format);
}
