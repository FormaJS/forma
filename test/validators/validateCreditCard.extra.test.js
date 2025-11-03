import { describe, it, expect } from 'vitest';
import { validateCreditCard } from '../../src/validators/validateCreditCard/index.js';
import '../setup.js';

describe('validateCreditCard extended', () => {
    it('type and basic invalids', () => {
        expect(validateCreditCard(123)).toEqual({ valid: false, error: 'invalidType' });
        // too short
        expect(validateCreditCard('4111')).toEqual({
            valid: false,
            error: 'validateCreditCardLength',
        });
    });

    it('provider and checksum', () => {
        // Known valid Visa test number (passes Luhn)
        expect(validateCreditCard('4111111111111111')).toEqual({ valid: true });

        // Invalid Luhn
        const r = validateCreditCard('4111111111111112');
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateCreditCardChecksum');
    });

    it('bulk card dataset (locale pt-BR)', () => {
        const cards = {
            4539620659922097: 'VISA',
            4929291898380766: 'VISA',
            5240082975622454: 'MASTERCARD',
            5530062640663264: 'MASTERCARD',
            345817690311361: 'AMEX',
            372938001199778: 'AMEX',
            4514161122113757: 'ELO',
            4389350446134811: 'ELO',
            6062828598919021: 'HIPERCARD',
            6062822916014409: 'HIPERCARD',
            4000000000002701: 'VISA',
            5200000000001005: 'MASTERCARD',
            6505050000001000: 'ELO',
            4000000000002503: 'VISA',
            5200000000001096: 'MASTERCARD',
            6505050000001091: 'ELO',
            4000000000002925: 'VISA',
            5200000000001013: 'MASTERCARD',
            6505050000001018: 'ELO',
            4000000000002370: 'VISA',
            5200000000001104: 'MASTERCARD',
            6505050000001109: 'ELO',
            5067766783888311: 'ELO',
            5031433215406351: 'MASTERCARD',
            4235647728025682: 'VISA',
            375365153556885: 'AMEX',
            5098176533461570: 'ELO',
            5067349319312260: 'ELO',
            5098193894226609: 'ELO',
            5091084515027541: 'ELO',
            5098177024386094: 'ELO',
            4391395999142147: 'VISA',
            4103922157715577: 'VISA',
            4380208328771358: 'VISA',
            4297672575052840: 'VISA',
            4380277454970936: 'VISA',
            5551555128049017: 'MASTERCARD',
            5268003770982262: 'MASTERCARD',
            5448382804657501: 'MASTERCARD',
            5582852950163914: 'MASTERCARD',
            5448384161742298: 'MASTERCARD',
            340205640990176: 'AMEX',
            340205958483061: 'AMEX',
            340205254489929: 'AMEX',
            340205493225258: 'AMEX',
            340205571301401: 'AMEX',
        };

        const failed = [];
        for (const card in cards) {
            const provider =
                typeof cards[card] === 'string' ? cards[card].toLowerCase() : undefined;
            const res = validateCreditCard(card, { locale: 'pt-BR', provider });
            if (!res || !res.valid) failed.push({ card, result: res });
        }
        expect(failed).toEqual([]);
    });

    it('provider-specific acceptance and mismatches', () => {
        // Visa provider explicit
        expect(validateCreditCard('4111111111111111', { provider: 'visa' })).toEqual({
            valid: true,
        });
        // Provider mismatch
        expect(validateCreditCard('4111111111111111', { provider: 'mastercard' })).toMatchObject({
            valid: false,
            error: 'validateCreditCardProviderMismatch',
        });
        // Unknown provider
        expect(
            validateCreditCard('4111111111111111', { provider: 'no-such-provider' })
        ).toMatchObject({ valid: false, error: 'validateCreditCardUnknownProvider' });

        // MasterCard explicit
        expect(validateCreditCard('5240082975622454', { provider: 'mastercard' })).toEqual({
            valid: true,
        });
        // Hipercard (locale-specific)
        expect(
            validateCreditCard('6062828598919021', { locale: 'pt-BR', provider: 'hipercard' })
        ).toEqual({ valid: true });
    });
});
