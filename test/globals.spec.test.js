import { describe, it, expect } from 'vitest';
import { GLOBAL_CASES } from './globals.cases.js';
import { validateHexadecimal } from '../src/validators/validateHexadecimal/index.js';
import { validateBIC } from '../src/validators/validateBIC/index.js';
import { validateUUID } from '../src/validators/validateUUID/index.js';
import { validateISINCode } from '../src/validators/validateISINCode/index.js';
import { validateISSN } from '../src/validators/validateISSN/index.js';
import { validateISRC } from '../src/validators/validateISRC/index.js';
import { validateISBN } from '../src/validators/validateISBN/index.js';
import { validateHexColor } from '../src/validators/validateHexColor/index.js';
import { validateIMEI } from '../src/validators/validateIMEI/index.js';
import { validateISO } from '../src/validators/validateISO/index.js';
import { validateMongoId } from '../src/validators/validateMongoId/index.js';
import { validateDataURI } from '../src/validators/validateDataURI/index.js';
import { validateHSL } from '../src/validators/validateHSL/index.js';
import { validateMimeType } from '../src/validators/validateMimeType/index.js';
import { validateMultibyte } from '../src/validators/validateMultibyte/index.js';
import { validateAscii } from '../src/validators/validateAscii/index.js';
import { validateSemVer } from '../src/validators/validateSemVer/index.js';
import { validateSurrogatePair } from '../src/validators/validateSurrogatePair/index.js';
import { validateMACAddress } from '../src/validators/validateMACAddress/index.js';

function checkArray(arr) {
  return Array.isArray(arr) ? arr : [];
}

describe('Global Validators', () => {
  describe('isHexadecimal', () => {
    it('valid hexadecimal', async () => {
      for (const v of checkArray(GLOBAL_CASES.isHexadecimal.valid)) {
        expect(await validateHexadecimal(v)).toEqual({ valid: true });
      }
    });
    it('invalid hexadecimal', async () => {
      for (const v of checkArray(GLOBAL_CASES.isHexadecimal.invalid)) {
        expect(await validateHexadecimal(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isBIC', () => {
    it('valid BIC', () => {
      for (const v of checkArray(GLOBAL_CASES.isBIC.valid)) {
        expect(validateBIC(v, { locale: 'en-US' })).toEqual({ valid: true });
      }
    });
    it('invalid BIC', () => {
      for (const v of checkArray(GLOBAL_CASES.isBIC.invalid)) {
        expect(validateBIC(v, { locale: 'en-US' })).toMatchObject({ valid: false });
      }
    });
  });

  describe('isUUID', () => {
    it('valid UUID', () => {
      for (const v of checkArray(GLOBAL_CASES.isUUID.valid)) {
        expect(validateUUID(v)).toEqual({ valid: true });
      }
    });
    it('invalid UUID', () => {
      for (const v of checkArray(GLOBAL_CASES.isUUID.invalid)) {
        expect(validateUUID(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isISINCode', () => {
    it('valid ISIN code', () => {
      for (const v of checkArray(GLOBAL_CASES.isISINCode.valid)) {
        expect(validateISINCode(v)).toEqual({ valid: true });
      }
    });
    it('invalid ISIN code', () => {
      for (const v of checkArray(GLOBAL_CASES.isISINCode.invalid)) {
        expect(validateISINCode(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isISSN', () => {
    it('valid ISSN', () => {
      for (const v of checkArray(GLOBAL_CASES.isISSN.valid)) {
        expect(validateISSN(v)).toEqual({ valid: true });
      }
    });
    it('invalid ISSN', () => {
      for (const v of checkArray(GLOBAL_CASES.isISSN.invalid)) {
        expect(validateISSN(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isISRC', () => {
    it('valid ISRC', () => {
      for (const v of checkArray(GLOBAL_CASES.isISRC.valid)) {
        expect(validateISRC(v)).toEqual({ valid: true });
      }
    });
    it('invalid ISRC', () => {
      for (const v of checkArray(GLOBAL_CASES.isISRC.invalid)) {
        expect(validateISRC(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isISBN10', () => {
    it('valid ISBN-10', () => {
      for (const v of checkArray(GLOBAL_CASES.isISBN10.valid)) {
        expect(validateISBN(v, { version: '10', locale: 'en-US' })).toEqual({ valid: true });
      }
    });
    it('invalid ISBN-10', () => {
      for (const v of checkArray(GLOBAL_CASES.isISBN10.invalid)) {
        expect(validateISBN(v, { version: '10', locale: 'en-US' })).toMatchObject({ valid: false });
      }
    });
  });

  describe('isISBN13', () => {
    it('valid ISBN-13', () => {
      for (const v of checkArray(GLOBAL_CASES.isISBN13.valid)) {
        expect(validateISBN(v, { version: '13', locale: 'en-US' })).toEqual({ valid: true });
      }
    });
    it('invalid ISBN-13', () => {
      for (const v of checkArray(GLOBAL_CASES.isISBN13.invalid)) {
        expect(validateISBN(v, { version: '13', locale: 'en-US' })).toMatchObject({ valid: false });
      }
    });
  });

  describe('isHexColor', () => {
    it('valid hex color', async () => {
      for (const v of checkArray(GLOBAL_CASES.isHexColor.valid)) {
        expect(await validateHexColor(v)).toEqual({ valid: true });
      }
    });
    it('invalid hex color', async () => {
      for (const v of checkArray(GLOBAL_CASES.isHexColor.invalid)) {
        expect(await validateHexColor(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isIMEI', () => {
    it('valid IMEI', () => {
      for (const v of checkArray(GLOBAL_CASES.isIMEI.valid)) {
        expect(validateIMEI(v)).toEqual({ valid: true });
      }
    });
    it('invalid IMEI', () => {
      for (const v of checkArray(GLOBAL_CASES.isIMEI.invalid)) {
        expect(validateIMEI(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('ISO3166-1-alpha-2', () => {
    it('valid ISO 3166-1 alpha-2', async () => {
      for (const v of checkArray(GLOBAL_CASES['ISO3166-1-alpha-2'].valid)) {
        expect(await validateISO(v, { standard: '3166-1', alpha: '2' })).toEqual({ valid: true });
      }
    });
    it('invalid ISO 3166-1 alpha-2', async () => {
      for (const v of checkArray(GLOBAL_CASES['ISO3166-1-alpha-2'].invalid)) {
        expect(await validateISO(v, { standard: '3166-1', alpha: '2' })).toMatchObject({
          valid: false,
        });
      }
    });
  });

  describe('ISO3166-1-alpha-3', () => {
    it('valid ISO 3166-1 alpha-3', async () => {
      for (const v of checkArray(GLOBAL_CASES['ISO3166-1-alpha-3'].valid)) {
        expect(await validateISO(v, { standard: '3166-1', alpha: '3' })).toEqual({ valid: true });
      }
    });
    it('invalid ISO 3166-1 alpha-3', async () => {
      for (const v of checkArray(GLOBAL_CASES['ISO3166-1-alpha-3'].invalid)) {
        expect(await validateISO(v, { standard: '3166-1', alpha: '3' })).toMatchObject({
          valid: false,
        });
      }
    });
  });

  describe('ISO639-1', () => {
    it('valid ISO 639-1', async () => {
      for (const v of checkArray(GLOBAL_CASES.ISO639_1.valid)) {
        expect(await validateISO(v, { standard: '639-1' })).toEqual({ valid: true });
      }
    });
    it('invalid ISO 639-1', async () => {
      for (const v of checkArray(GLOBAL_CASES.ISO639_1.invalid)) {
        expect(await validateISO(v, { standard: '639-1' })).toMatchObject({ valid: false });
      }
    });
  });

  describe('ISO4217', () => {
    it('valid ISO 4217', async () => {
      for (const v of checkArray(GLOBAL_CASES.ISO4217.valid)) {
        expect(await validateISO(v, { standard: '4217' })).toEqual({ valid: true });
      }
    });
    it('invalid ISO 4217', async () => {
      for (const v of checkArray(GLOBAL_CASES.ISO4217.invalid)) {
        expect(await validateISO(v, { standard: '4217' })).toMatchObject({ valid: false });
      }
    });
  });

  describe('isMongoId', () => {
    it('valid MongoId', async () => {
      for (const v of checkArray(GLOBAL_CASES.isMongoId.valid)) {
        expect(await validateMongoId(v)).toEqual({ valid: true });
      }
    });
    it('invalid MongoId', async () => {
      for (const v of checkArray(GLOBAL_CASES.isMongoId.invalid)) {
        expect(await validateMongoId(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isDataURI', () => {
    it('valid Data URI', () => {
      for (const v of checkArray(GLOBAL_CASES.isDataURI.valid)) {
        expect(validateDataURI(v)).toEqual({ valid: true });
      }
    });
    it('invalid Data URI', () => {
      for (const v of checkArray(GLOBAL_CASES.isDataURI.invalid)) {
        expect(validateDataURI(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isHSL', () => {
    it('valid HSL', () => {
      for (const v of checkArray(GLOBAL_CASES.isHSL.valid)) {
        expect(validateHSL(v)).toEqual({ valid: true });
      }
    });
    it('invalid HSL', () => {
      for (const v of checkArray(GLOBAL_CASES.isHSL.invalid)) {
        expect(validateHSL(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isMimeType', () => {
    it('valid MIME type', () => {
      for (const v of checkArray(GLOBAL_CASES.isMimeType.valid)) {
        expect(validateMimeType(v)).toEqual({ valid: true });
      }
    });
    it('invalid MIME type', () => {
      for (const v of checkArray(GLOBAL_CASES.isMimeType.invalid)) {
        expect(validateMimeType(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isMultibyte', () => {
    it('valid multibyte', async () => {
      for (const v of checkArray(GLOBAL_CASES.isMultibyte.valid)) {
        expect(await validateMultibyte(v)).toEqual({ valid: true });
      }
    });
    it('invalid multibyte', async () => {
      for (const v of checkArray(GLOBAL_CASES.isMultibyte.invalid)) {
        expect(await validateMultibyte(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isAscii', () => {
    it('valid ASCII', () => {
      for (const v of checkArray(GLOBAL_CASES.isAscii.valid)) {
        expect(validateAscii(v)).toEqual({ valid: true });
      }
    });
    it('invalid ASCII', () => {
      for (const v of checkArray(GLOBAL_CASES.isAscii.invalid)) {
        expect(validateAscii(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isSemVer', () => {
    it('valid SemVer', () => {
      for (const v of checkArray(GLOBAL_CASES.isSemVer.valid)) {
        expect(validateSemVer(v)).toEqual({ valid: true });
      }
    });
    it('invalid SemVer', () => {
      for (const v of checkArray(GLOBAL_CASES.isSemVer.invalid)) {
        expect(validateSemVer(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isSurrogatePair', () => {
    it('valid surrogate pair', async () => {
      for (const v of checkArray(GLOBAL_CASES.isSurrogatePair.valid)) {
        expect(await validateSurrogatePair(v)).toEqual({ valid: true });
      }
    });
    it('invalid surrogate pair', async () => {
      for (const v of checkArray(GLOBAL_CASES.isSurrogatePair.invalid)) {
        expect(await validateSurrogatePair(v)).toMatchObject({ valid: false });
      }
    });
  });

  describe('isMACAddress', () => {
    it('valid MAC address', async () => {
      for (const v of checkArray(GLOBAL_CASES.isMACAddress.valid)) {
        expect(await validateMACAddress(v)).toEqual({ valid: true });
      }
    });
    it('invalid MAC address', async () => {
      for (const v of checkArray(GLOBAL_CASES.isMACAddress.invalid)) {
        expect(await validateMACAddress(v)).toMatchObject({ valid: false });
      }
    });
  });
});
