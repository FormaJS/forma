import { describe, it, expect } from 'vitest';
import { validateMongoId } from '../../src/validators/validateMongoId/index.js';
import '../setup.js';

describe('validateMongoId', () => {
    it('rejects non-string types', async () => {
        const r = await validateMongoId(123);
        expect(r).toEqual({ valid: false, error: 'invalidType' });
    });

    it('accepts 24-char hex strings and rejects others', async () => {
        const ok = await validateMongoId('507f1f77bcf86cd799439011');
        expect(ok).toEqual({ valid: true });

        const bad = await validateMongoId('not-a-mongo-id');
        expect(bad.valid).toBe(false);
        expect(bad.error).toBe('validateMongoId');
    });
});
