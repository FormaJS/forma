/*
 * Reusable RegEx constants for building validators.
 */

// --- Domain & URL ---
export const domainHostAscii = '(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+';
export const tldAscii = '[a-zA-Z]{2,}';
export const internationalChars = '\\p{L}\\p{N}'; // \p{L} = Letters, \p{N} = Numbers
export const domainHostInternational = `(?:[${internationalChars}](?:[${internationalChars}-]{0,61}[${internationalChars}])?\\.)+`;
export const tldInternational = '[\\p{L}]{2,}';

// --- Email ---
export const localAscii = "a-zA-Z0-9!#$%&'*+/=?^_`{|}~\\-";

// --- IP ---
export const ipv4Segment = '(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-5]|0)';
export const ipv4Address = `(${ipv4Segment}\\.){3}${ipv4Segment}`;
export const ipv6Segment = '[0-9a-fA-F]{1,4}';
export const ipv6Address =
  '(' +
  `(?:${ipv6Segment}:){7}(?:${ipv6Segment}|:)|` + // 1:2:3:4:5:6:7:8
  `(?:${ipv6Segment}:){6}(?:${ipv4Address}|:${ipv6Segment}|:)|` + // 1:2:3:4:5:6:7 IPv4 | ::8 | ::
  `(?:${ipv6Segment}:){5}(?::${ipv4Address}|(:${ipv6Segment}){1,2}|:)|` + // 1:2:3:4:5:6 IPv4 | ::7:8 | ::8 | ::
  `(?:${ipv6Segment}:){4}(?:(:${ipv6Segment}){0,1}:${ipv4Address}|(:${ipv6Segment}){1,3}|:)|` + // ...
  `(?:${ipv6Segment}:){3}(?:(:${ipv6Segment}){0,2}:${ipv4Address}|(:${ipv6Segment}){1,4}|:)|` + // ...
  `(?:${ipv6Segment}:){2}(?:(:${ipv6Segment}){0,3}:${ipv4Address}|(:${ipv6Segment}){1,5}|:)|` + // ...
  `(?:${ipv6Segment}:){1}(?:(:${ipv6Segment}){0,4}:${ipv4Address}|(:${ipv6Segment}){1,6}|:)|` + // ...
  `(?::((?::${ipv6Segment}){0,5}:${ipv4Address}|(?::${ipv6Segment}){1,7}|:))` + // ::...
  ')';
export const domainIP = `\\[(?:${ipv4Address}|${ipv6Address})\\]`;

// --- Base64 ---
// Standard Base64 alphabet (RFC 4648)
export const base64Chars = 'A-Za-z0-9+/';
// Base64 URL Safe alphabet (RFC 4648 §5)
export const base64UrlSafeChars = 'A-Za-z0-9_-';
// Base64 pattern (no padding)
export const base64Regex = `^[${base64Chars}]+={0,2}$`;
// Base64 URL Safe pattern (no padding)
export const base64UrlSafeRegex = `^[${base64UrlSafeChars}]+={0,2}$`;

export const displayNameRegex = /.*<(.+)>$/;

export const unescapeRegex = /(&amp;|&lt;|&gt;|&quot;|&#x27;)/g;

// Simple RegEx to remove *all* HTML/XML tags
export const simpleTagRegex = /<[^>]*>/g;
export const complexTagRegex = /<(\/?)(\w+)(?:[^>]*)>/gi;

export const domainSegment = '(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)';

/**
 * Basic regex to validate ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ or +/-HH:mm or +/-HHmm).
 * Covers dates, date-times, and basic timezones.
 */
export const iso8601RegexLenient =
  /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?(?:Z|([+-]\d{2}(?::?\d{2})?))?$/;

/**
 * Strict regex for ISO 8601, requiring date, time, seconds, and timezone (Z or offset).
 */
export const iso8601RegexStrict =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|([+-]\d{2}(?::?\d{2})?))$/;

// --- JWT ---
// Defines the 3-part format (Header.Payload.Signature)
// using the Base64 URL-Safe characters we've already defined.
export const jwtRegex = new RegExp(
  `^([${base64UrlSafeChars}]+)\\.([${base64UrlSafeChars}]+)\\.([${base64UrlSafeChars}]+)$`
);

export const uppercaseRegex = /[A-Z]/g;
export const lowercaseRegex = /[a-z]/g;
export const numbersRegex = /[0-9]/g;

// (OWASP symbol pattern)
export const symbolsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/g;

// RegEx IBAN generic format
export const ibanFormatRegex = /^[A-Z]{2}\d{2}[A-Z0-9]+$/;
