import { describe, it, expect } from 'vitest';
import './setup.js';

import { LOCALE_CASES } from './locale-cases/index.js';
import { validateAlpha } from '../src/validators/validateAlpha/index.js';
import { validateAlphanumeric } from '../src/validators/validateAlphanumeric/index.js';
import { validatePostalCode } from '../src/validators/validatePostalCode/index.js';
import { validateMobileNumber } from '../src/validators/validateMobileNumber/index.js';
import { validateTaxId } from '../src/validators/validateTaxId/index.js';
import {
  formatMobileNumber,
  formatPostalCode,
  formatCurrency,
  formatDate,
  formatTaxId,
} from '../src/formatters/index.js';
import { toBoolean, toDate as parseDate, toFloat, toInt } from '../src/parsers/index.js';
import { validateCurrency } from '../src/validators/validateCurrency/index.js';
import { validateDate as validateDateValidator } from '../src/validators/validateDate/index.js';
import { validateDecimal } from '../src/validators/validateDecimal/index.js';
import { validateFloat as validateFloatValidator } from '../src/validators/validateFloat/index.js';
import { validateLicensePlate } from '../src/validators/validateLicensePlate/index.js';
import { validateNumeric } from '../src/validators/validateNumeric/index.js';
import { validateBoolean } from '../src/validators/validateBoolean/index.js';

function checkArray(arr) {
  return Array.isArray(arr) ? arr : [];
}

for (const cfg of LOCALE_CASES) {
  const { locale } = cfg;
  describe(`Locale: ${locale}`, () => {
    const vcfg = cfg.validate || cfg;
    if (vcfg.alpha) {
      it('alpha valid', () => {
        for (const v of checkArray(vcfg.alpha.valid)) {
          expect(validateAlpha(v, { locale })).toEqual({ valid: true });
        }
      });
      it('alpha invalid', () => {
        for (const v of checkArray(vcfg.alpha.invalid)) {
          expect(validateAlpha(v, { locale })).toMatchObject({ valid: false });
        }
      });
    }

    if (vcfg.alphanumeric) {
      it('alphanumeric valid', () => {
        for (const v of checkArray(vcfg.alphanumeric.valid)) {
          expect(validateAlphanumeric(v, { locale })).toEqual({ valid: true });
        }
      });
      it('alphanumeric invalid', () => {
        for (const v of checkArray(vcfg.alphanumeric.invalid)) {
          expect(validateAlphanumeric(v, { locale })).toMatchObject({ valid: false });
        }
      });
    }

    if (vcfg.postalcode) {
      it('postal code valid', () => {
        for (const v of checkArray(vcfg.postalcode.valid)) {
          expect(validatePostalCode(v, { locale })).toEqual({ valid: true });
        }
      });
      it('postal code invalid', () => {
        for (const v of checkArray(vcfg.postalcode.invalid)) {
          expect(validatePostalCode(v, { locale })).toMatchObject({ valid: false });
        }
      });
    }

    if (vcfg.mobile) {
      it('mobile valid', async () => {
        for (const v of checkArray(vcfg.mobile.valid)) {
          expect(await validateMobileNumber(v, { locale })).toEqual({ valid: true });
        }
      });
      it('mobile invalid', async () => {
        for (const v of checkArray(vcfg.mobile.invalid)) {
          expect(await validateMobileNumber(v, { locale })).toMatchObject({ valid: false });
        }
      });
    }

    if (vcfg.taxid) {
      it('taxid valid', async () => {
        for (const v of checkArray(vcfg.taxid.valid)) {
          expect((await validateTaxId(v, { locale })).valid).toBe(true);
        }
      });
      it('taxid invalid', async () => {
        for (const v of checkArray(vcfg.taxid.invalid)) {
          const res = await validateTaxId(v, { locale });
          expect(res.valid).toBe(false);
          expect(res.error).toBeDefined();
        }
      });
    }

    if (cfg.formatters) {
      describe('formatters', () => {
        if (Array.isArray(cfg.formatters.mobile)) {
          it('format mobile', () => {
            for (const c of cfg.formatters.mobile) {
              const out = formatMobileNumber(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.formatters.postalcode)) {
          it('format postal code', () => {
            for (const c of cfg.formatters.postalcode) {
              const out = formatPostalCode(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.formatters.currency)) {
          it('format currency', () => {
            for (const c of cfg.formatters.currency) {
              const out = formatCurrency(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.formatters.date)) {
          it('format date', () => {
            for (const c of cfg.formatters.date) {
              const out = formatDate(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.formatters.taxid)) {
          it('format tax id', () => {
            for (const c of cfg.formatters.taxid) {
              const out = formatTaxId(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
      });
    }

    if (cfg.parsers) {
      describe('parsers', () => {
        if (Array.isArray(cfg.parsers.boolean)) {
          it('toBoolean', () => {
            for (const c of cfg.parsers.boolean) {
              const out = toBoolean(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.parsers.float)) {
          it('toFloat', () => {
            for (const c of cfg.parsers.float) {
              const out = toFloat(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.parsers.int)) {
          it('toInt', () => {
            for (const c of cfg.parsers.int) {
              const out = toInt(c.in, { locale, ...(c.options || {}) });
              expect(out).toBe(c.out);
            }
          });
        }
        if (Array.isArray(cfg.parsers.date)) {
          it('toDate', () => {
            for (const c of cfg.parsers.date) {
              const out = parseDate(c.in, { locale, ...(c.options || {}) });
              expect(out instanceof Date ? out.getTime() : out).toBe(
                c.out instanceof Date ? c.out.getTime() : c.out
              );
            }
          });
        }
      });
    }

    describe('validators (second round)', () => {
      if (Array.isArray(cfg.formatters?.currency) && cfg.formatters.currency.length > 0) {
        it('validateCurrency valid', () => {
          for (const c of cfg.formatters.currency) {
            const sample = c.out;
            expect(validateCurrency(sample, { locale })).toEqual({ valid: true });
          }
        });
        it('validateCurrency invalid', () => {
          const invalidSamples = ['1234.56', '1234,56', '$abc'];
          for (const s of invalidSamples) {
            expect(validateCurrency(s, { locale }).valid).toBe(false);
          }
        });
      }

      if (Array.isArray(cfg.parsers?.date) && cfg.parsers.date.length > 0) {
        it('validateDate', () => {
          for (const c of cfg.parsers.date) {
            const res = validateDateValidator(c.in, { locale, ...(c.options || {}) });
            const shouldBeValid = c.out instanceof Date;
            expect(res.valid).toBe(shouldBeValid);
          }
        });
      }

      const floatInputs = Array.isArray(cfg.parsers?.float)
        ? cfg.parsers.float.map((c) => c.in)
        : [];
      const intInputs = Array.isArray(cfg.parsers?.int) ? cfg.parsers.int.map((c) => c.in) : [];
      if (floatInputs.length > 0) {
        it('validateDecimal valid', () => {
          for (const s of floatInputs) {
            expect(validateDecimal(s, { locale })).toEqual({ valid: true });
          }
        });
      }
      if (intInputs.length > 0) {
        it('validateDecimal invalid (integers)', () => {
          for (const s of intInputs) {
            const res = validateDecimal(s, { locale });
            expect(res.valid).toBe(false);
          }
        });
      }

      if (floatInputs.length + intInputs.length > 0) {
        it('validateFloat', () => {
          for (const s of [...floatInputs, ...intInputs]) {
            expect(validateFloatValidator(s, { locale })).toEqual({ valid: true });
          }
          expect(validateFloatValidator('abc', { locale }).valid).toBe(false);
        });
      }

      if (floatInputs.length + intInputs.length > 0) {
        it('validateNumeric', () => {
          for (const s of [...floatInputs, ...intInputs]) {
            expect(validateNumeric(s, { locale })).toEqual({ valid: true });
          }
          for (const s of ['abc', '1,23,4.56']) {
            expect(validateNumeric(s, { locale }).valid).toBe(false);
          }
        });
      }

      if (vcfg.licensePlate) {
        it('validateLicensePlate', async () => {
          const { valid = [], invalid = [] } = vcfg.licensePlate;
          for (const entry of valid) {
            const plate = typeof entry === 'object' ? entry.plate || entry.value : entry;
            const state = typeof entry === 'object' ? entry.state : undefined;
            const res = await validateLicensePlate(plate, state ? { locale, state } : { locale });
            expect(res.valid).toBe(true);
          }
          for (const entry of invalid) {
            const plate = typeof entry === 'object' ? entry.plate || entry.value : entry;
            const state = typeof entry === 'object' ? entry.state : undefined;
            const res = await validateLicensePlate(plate, state ? { locale, state } : { locale });
            expect(res.valid).toBe(false);
          }
        });
      }

      it('validateBoolean - type validation', () => {
        const res = validateBoolean(123, { locale });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('invalidType');
      });

      it('validateBoolean - strict mode', () => {
        const resTrue = validateBoolean('true', { locale, strict: true });
        const resFalse = validateBoolean('false', { locale, strict: true });
        expect(resTrue.valid).toBe(true);
        expect(resFalse.valid).toBe(true);
      });

      it('validateBoolean - loose mode', () => {
        const res1 = validateBoolean('1', { locale });
        const res0 = validateBoolean('0', { locale });
        expect(res1.valid).toBe(true);
        expect(res0.valid).toBe(true);
      });

      it('validateBoolean - invalid text', () => {
        const res = validateBoolean('maybe', { locale });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validateBoolean');
      });
    });
  });
}
