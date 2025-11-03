import { describe, it, expect } from 'vitest';
import testThrow from '../../src/validators/testThrow/index.js';
import '../setup.js';

describe('testThrow', () => {
    it('throws an error when called', () => {
        expect(() => testThrow()).toThrowError('test-throw');
    });
});
