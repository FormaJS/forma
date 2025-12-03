import { numberToWords } from './numberToWords.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Formats a number into an accessible text representation (number to words).
 *
 * @param {number|string} number - The number to format.
 * @param {string} [locale='en-US'] - The locale to use ('en-US' or 'pt-BR').
 * @param {object} [options={}] - Options.
 * @param {string} [options.mode='full'] - 'full' (extenso) or 'abbreviated' (short scale).
 * @returns {string} The accessible string.
 */
export function toAccessible(number, locale = 'en-US', options = {}) {
    const num = Number(number);
    if (isNaN(num)) {
        throw new Error('Invalid number input');
    }

    const localeData = getLocaleData(locale);
    if (!localeData || !localeData.accessible) {
        // Fallback or error?
        // For now, if no data, throw error or fallback to en-US?
        // Given the requirement to support all languages, we should probably fail gracefully or fallback.
        // But if the user asks for 'pt-BR' and we have no data, it's an error.
        throw new Error(`Locale data for '${locale}' not found or missing 'accessible' section.`);
    }

    const { mode = 'full' } = options;

    if (mode === 'abbreviated') {
        return formatAbbreviated(num, locale, localeData);
    }

    return formatFull(num, locale, localeData);
}

function formatFull(num, locale, localeData) {
    const integerPart = Math.floor(num);
    const decimalPart = num - integerPart;

    let text = numberToWords(integerPart, locale, localeData);

    if (decimalPart > 0) {
        const decimalStr = num.toString().split('.')[1];
        if (decimalStr) {
            const separator = locale === 'pt-BR' ? ' vírgula ' : ' point ';
            const digits = decimalStr.split('').map(d => numberToWords(parseInt(d), locale, localeData)).join(' ');
            text += separator + digits;
        }
    }

    return text;
}

function formatAbbreviated(num, locale, localeData) {
    // Calculate scale
    const abs = Math.abs(num);
    const tiers = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' }, // Usually not used in speech for accessible? "1 thousand"
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' }
    ];

    // We want "1.2 million".
    // Find the largest tier <= num
    // Actually, Intl compact does this.
    // But we want the *words* for the number and the scale.

    // Let's use Intl to find the compact parts, then read them?
    // Intl "1.2 M" -> parts: { integer: 1, decimal: 2, literal: M }
    // We can map "M" to "million"/"milhões".

    const parts = new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'long' }).formatToParts(num);
    // compactDisplay: 'long' gives "1.2 million" (en-US) or "1,2 milhão" (pt-BR).
    // Wait, `compactDisplay: 'long'` might solve the "abbreviated" text requirement directly!
    // Let's check.
    // en-US: 1200000 -> "1.2 million"
    // pt-BR: 1200000 -> "1,2 milhão" (or "1,2 milhões")

    // User wanted: "um ponto dois milhões".
    // "1.2 million" is close.
    // "1,2 milhões" is close.
    // But user wants "um ponto dois".
    // "1,2" is read as "um vírgula dois" in PT.
    // So if I return "1,2 milhões", is that accessible?
    // The user explicitly wrote "um ponto dois milhões".
    // If I return "1.2 million", a screen reader reads "one point two million".
    // If I return "1,2 milhões", a screen reader reads "um vírgula dois milhões".
    // The user's "um ponto dois" might be a specific request for *written out* text.

    // If I use `compactDisplay: 'long'`, I get "1.2 million".
    // I can try to convert the digits to words.

    const compactStr = new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'long' }).format(num);
    // "1.2 million"

    // Regex to parse: (\d+[.,]\d+) (.*)
    // But it might be "1200" -> "1.2 thousand" or just "1.2 K"?
    // compactDisplay: long gives "thousand", "million".

    // Let's try to parse the number part and convert to words.
    // "1.2" -> "one point two".

    const result = compactStr.replace(/\d+([.,]\d+)?/, (match) => {
        // match is "1.2" or "1,2"
        const parts = match.split(/[.,]/);
        const intPart = parseInt(parts[0]);
        const decPart = parts[1] ? parts[1] : '';

        let str = numberToWords(intPart, locale, localeData);
        if (decPart) {
            const sep = locale === 'pt-BR' ? 'ponto' : 'point';

            const decWords = decPart.split('').map(d => numberToWords(parseInt(d), locale, localeData)).join(' ');
            str += ` ${sep} ${decWords}`;
        }
        return str;
    });

    // Fix for pt-BR "milhão" vs "milhões" preference
    if (locale === 'pt-BR' && result.includes('milhão') && num >= 2000000) {
        // Standard rule: >= 2 million is plural.
        // But user wanted 1.2 million -> "milhões".
        // If num > 1000000, maybe force plural?
        // "1,2 milhão" -> "1,2 milhões".
        return result.replace('milhão', 'milhões');
    }
    // Actually, if the user wants "1.2 milhões", I should just replace it if it's not exactly 1 million?
    // Or if the integer part is > 1? No, integer part is 1.
    // Let's just replace 'milhão' with 'milhões' if there is a decimal part?
    if (locale === 'pt-BR' && result.includes('milhão') && (num > 1000000 && num < 2000000)) {
        // Range 1M - 2M. Intl gives "milhão". User wants "milhões" for 1.2M.
        return result.replace('milhão', 'milhões');
    }

    return result;
}
