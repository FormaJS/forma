/**
 * Calculate and verify Modulus 11 (Mod11) check digits for a given numeric value.
 * The function expects `value` to be a string or number where the last `digits`
 * characters are the check digits. It computes `digits` Mod11 check digits
 * using a weight that starts at `startWeight`, increments to 9 and then wraps
 * back to `startWeight`.
 *
 * Note: the implementation returns `false` for invalid inputs (non-digits,
 * invalid digits/startWeight, or when the value length is too short).
 *
 * @param {string|number} value - Numeric value containing base + check digits.
 * @param {number|string} digits - Number of check digits appended to `value`.
 * @param {number|string} startWeight - Starting weight for the calculation.
 * @returns {boolean} True if calculated check digits match the provided ones, false otherwise.
 */
export function calculateMod11(value, digits, startWeight, maxWeight) {
    const calculateSingleDigit = (baseNumber, currentStartWeight) => {
        let sum = 0;
        let weight = currentStartWeight;

        for (let i = baseNumber.length - 1; i >= 0; i--) {
            const digit = parseInt(baseNumber.charAt(i), 10);

            if (isNaN(digit)) {
                return null;
            }

            weight = weight > maxWeight ? startWeight : weight;

            sum += digit * weight;

            weight++;
        }

        const remainder = sum % 11;

        const dv = remainder < 2 ? 0 : 11 - remainder;

        return String(dv);
    };

    value = String(value);
    digits = parseInt(digits, 10);
    startWeight = parseInt(startWeight, 10);
    maxWeight = parseInt(maxWeight, 10);

    if (!/^\d+$/.test(value) || isNaN(digits) || isNaN(startWeight) || isNaN(maxWeight)) {
        return false;
    }

    if (digits < 1 || value.length <= digits) {
        return false;
    }

    const initialBase = value.substring(0, value.length - digits);
    const expectedDvs = value.substring(value.length - digits);

    let currentBase = initialBase;
    let calculatedDvs = '';

    for (let i = 0; i < digits; i++) {
        const newDv = calculateSingleDigit(currentBase, startWeight);

        if (newDv === null) {
            return false;
        }

        calculatedDvs += newDv;
        currentBase += newDv;
    }

    return calculatedDvs === expectedDvs;
}
