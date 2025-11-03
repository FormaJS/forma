import { describe, it, expect } from 'vitest';
import defaultOnlyFallback, {
    onlyFallback as onlyFallbackNamed,
} from '../../src/validators/onlyFallback/index.js';
import '../setup.js';

describe('onlyFallback', () => {
    it('default and named export both return true', () => {
        expect(typeof defaultOnlyFallback).toBe('function');
        expect(typeof onlyFallbackNamed).toBe('function');
        expect(defaultOnlyFallback()).toBe(true);
        expect(onlyFallbackNamed()).toBe(true);
    });
});
