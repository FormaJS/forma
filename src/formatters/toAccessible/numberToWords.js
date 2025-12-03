
function convertGroup(n, locale, localeData) {
    if (n === 0) return '';

    const { ones, teens, tens, hundreds } = localeData.accessible;

    let parts = [];

    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const o = n % 10;

    // Strategy detection
    const isEnglish = locale.startsWith('en');
    const isPortuguese = locale.startsWith('pt');
    const isSpanish = locale.startsWith('es');
    const isFrench = locale.startsWith('fr');
    const isItalian = locale.startsWith('it');
    const isGerman = locale.startsWith('de');

    if (isEnglish) {
        if (h > 0) {
            parts.push(ones[h] + ' hundred');
        }
        if (t >= 2) {
            let tenStr = tens[t];
            if (o > 0) tenStr += '-' + ones[o];
            parts.push(tenStr);
        } else if (t === 1) {
            parts.push(teens[o]);
        } else if (o > 0) {
            parts.push(ones[o]);
        }
        return parts.join(' ');
    }

    // Generalized Latin/Romance logic (PT, ES, IT, FR somewhat)

    if (isPortuguese) {
        if (h > 0) {
            if (h === 1 && t === 0 && o === 0) parts.push('cem');
            else parts.push(hundreds[h]);
        }
        if (t >= 2) {
            parts.push(tens[t]);
            if (o > 0) parts.push(ones[o]);
        } else if (t === 1) {
            parts.push(teens[o]);
        } else if (o > 0) {
            parts.push(ones[o]);
        }
        return parts.join(' e ');
    }

    if (isSpanish) {
        if (h > 0) {
            if (h === 1 && t === 0 && o === 0) parts.push('cien');
            else if (h === 1) parts.push('ciento'); // Explicitly "ciento" if not exactly 100
            else parts.push(hundreds[h]);
        }
        if (t >= 2) {
            if (t === 2 && o > 0) parts.push('veinti' + ones[o]);
            else {
                parts.push(tens[t]);
                if (o > 0) parts.push('y ' + ones[o]);
            }
        } else if (t === 1) {
            parts.push(teens[o]);
        } else if (o > 0) {
            parts.push(ones[o]);
        }
        return parts.join(' ');
    }

    if (isItalian) {
        if (h > 0) {
            if (h === 1) parts.push('cento');
            else parts.push(ones[h] + 'cento'); // duecento
            // Note: ones[h] might be "due", "tre". "unocento" is wrong -> "cento". Handled.
        }
        if (t >= 2) {
            let ten = tens[t];
            let one = ones[o];
            if (o === 1 || o === 8) {
                ten = ten.slice(0, -1);
            }
            parts.push(ten);
            if (o > 0) parts.push(one);
        } else if (t === 1) {
            parts.push(teens[o]);
        } else if (o > 0) {
            parts.push(ones[o]);
        }
        return parts.join('');
    }

    if (isFrench) {
        if (h > 0) {
            if (h === 1) parts.push('cent');
            else parts.push(ones[h] + ' cents'); // Plural "cents" for hundreds? Usually yes if end.
            // Simplified: "deux cents".
        }

        let part = '';
        if (t === 7) {
            part = 'soixante';
            if (o === 1) part += '-et-onze';
            else part += '-' + teens[o];
        } else if (t === 9) {
            part = 'quatre-vingt-' + teens[o];
        } else if (t === 8) {
            part = 'quatre-vingt';
            if (o === 0) part += 's';
            else part += '-' + ones[o];
        } else if (t >= 2) {
            part = tens[t];
            if (o === 1) part += '-et-un';
            else if (o > 0) part += '-' + ones[o];
        } else if (t === 1) {
            part = teens[o];
        } else if (o > 0) {
            part = ones[o];
        }
        if (part) parts.push(part);

        return parts.join(' ');
    }

    if (isGerman) {
        if (h > 0) {
            let one = ones[h];
            if (h === 1) one = 'ein';
            parts.push(one + 'hundert');
        }
        if (t >= 2) {
            if (o > 0) {
                let one = ones[o];
                if (o === 1) one = 'ein';
                parts.push(one + 'und' + tens[t]);
            }
            else parts.push(tens[t]);
        } else if (t === 1) {
            parts.push(teens[o]);
        } else if (o > 0) {
            let one = ones[o];
            if (o === 1) one = 'eins'; // "eins" at end? Yes. "einhundert eins"? No, "einhunderteins".
            // Wait, 1 -> "eins". 101 -> "einhunderteins".
            // But 21 -> "einundzwanzig".
            // So if combined with "und", "ein". If standalone unit, "eins".
            // Here it is standalone unit (t=0).
            parts.push(one);
        }
        return parts.join('');
    }


    return '';
}

export function numberToWords(num, locale, localeData) {
    if (num === 0) {
        // Zero handling
        if (locale.startsWith('pt') || locale.startsWith('es') || locale.startsWith('it')) return 'zero'; // es: cero?
        if (locale.startsWith('es')) return 'cero';
        if (locale.startsWith('de')) return 'null';
        if (locale.startsWith('fr')) return 'zéro';
        return 'zero';
    }

    const { scales, scalesPlural } = localeData.accessible;

    let n = Math.abs(num);
    let parts = [];
    let scaleIdx = 0;

    while (n > 0) {
        const group = n % 1000;
        n = Math.floor(n / 1000);

        if (group > 0) {
            let groupStr = convertGroup(group, locale, localeData);
            let scaleName = '';

            if (scaleIdx > 0) {
                if (locale.startsWith('pt')) {
                    if (group === 1 && scaleIdx === 1) {
                        groupStr = ''; // Just "mil"
                    }
                    scaleName = (group > 1 && scalesPlural) ? scalesPlural[scaleIdx] : scales[scaleIdx];
                } else {
                    scaleName = scales[scaleIdx];
                    // Pluralization for others?
                    // ES: millón -> millones. My data: "millón", "mil millones".
                    // I need plural scales for ES too?
                    // For now, using singular from data or simple append.
                }
            }

            let part = groupStr + (scaleName ? ' ' + scaleName : '');
            parts.unshift(part.trim());
        }
        scaleIdx++;
    }

    if (locale.startsWith('pt')) {
        return parts.join(' e ');
    } else if (locale.startsWith('de') || locale.startsWith('it')) {
        return parts.join('');
    } else if (locale.startsWith('en') || locale.startsWith('es') || locale.startsWith('fr')) {
        return parts.join(' ');
    } else {
        // Fallback for unsupported languages
        return num.toString();
    }
}
