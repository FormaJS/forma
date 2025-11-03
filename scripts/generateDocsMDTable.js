#!/usr/bin/env node
/**
 * Script to generate comprehensive documentation for validators, sanitizers, and parsers
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validatorsDir = path.join(__dirname, '../src/validators');
const sanitizersDir = path.join(__dirname, '../src/sanitizers');
const parsersDir = path.join(__dirname, '../src/parsers');
const formattersDir = path.join(__dirname, '../src/formatters');

/**
 * Reads the function signature, extracts parameters and finds the corresponding JSDoc block.
 * @param {string} filePath - Path to the file (usually index.js)
 * @returns {object | null} Object with function data or null if not found.
 */
function extractFunctionSignature(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Regex adjusted to handle export, export default, export async function, etc.
    const functionMatch = content.match(/export (?:default |async )?function (\w+)\(([^)]*)\)/);
    if (!functionMatch) return null;

    const [, name, paramsRaw] = functionMatch;
    const functionStartIndex = functionMatch.index;

    // Finds all JSDoc blocks before the function
    const beforeFunction = content.substring(0, functionStartIndex);
    const jsdocPattern = /\/\*\*([\s\S]*?)\*\//g;

    // Stores all matches
    const allMatches = [];
    let match;
    while ((match = jsdocPattern.exec(beforeFunction)) !== null) {
        allMatches.push({
            block: match[0], // The entire JSDoc block (including /** and */)
            content: match[1], // The internal content
            index: match.index,
        });
    }

    let description = '';
    let paramDocs = {};
    let returnDoc = '';

    let targetJsdocBlock = null;
    let targetJsdocContent = '';

    // Iterates backwards through all found JSDoc blocks
    // We want the *last* block that is *NOT* a @typedef or @type
    if (allMatches.length > 0) {
        for (let i = allMatches.length - 1; i >= 0; i--) {
            const current = allMatches[i];
            if (!current.content.includes('@typedef') && !current.content.includes('@type {')) {
                // This is the first non-typedef block we find from the end.
                // This is the one that belongs to the function.
                targetJsdocBlock = current.block;
                targetJsdocContent = current.content;
                break; // Found
            }
        }
    }

    // If we found a relevant JSDoc block, we parse it
    if (targetJsdocBlock && targetJsdocContent) {
        // Extracts the main description (lines before @param/@returns)
        const descLines = [];
        const lines = targetJsdocContent.split('\n');
        for (const line of lines) {
            const trimmed = line.replace(/^\s*\*\s?/, '').trim();
            // First checks if it's a tag, to stop
            if (trimmed.startsWith('@')) break;
            // If not a tag, adds if not empty
            if (trimmed) {
                descLines.push(trimmed);
            }
            // Empty lines (trimmed === '') are simply ignored
        }
        description = descLines.join(' ');

        // The regex now uses [\w.]+ (group 2) to capture names with dots (e.g. options.locale)
        // This prevents 'options.locale' from being saved as 'options'
        const paramMatches = targetJsdocBlock.matchAll(
            /@param\s+{([^}]+)}\s+(?:\[?([\w.]+)(?:=[^\]]*)?\]?)\s*-?\s*(.*)?/g
        );
        for (const m of paramMatches) {
            const paramName = m[2]; // The clean name (e.g., 'options' or 'options.locale')
            paramDocs[paramName] = { type: m[1], desc: (m[3] || '').trim() };
        }

        // Extracts the return documentation
        const returnMatch = targetJsdocBlock.match(/@returns?\s+{([^}]+)}\s+(.+)?/);
        if (returnMatch) {
            returnDoc = (returnMatch[2] || '').trim();
        }
    }

    return {
        name,
        // Parses the function signature (gets 'options = {}' and turns into 'options')
        params: paramsRaw
            .split(',')
            .map((p) => p.trim().split('=')[0].trim()) // Remove default value
            .filter(Boolean),
        description,
        paramDocs, // Now contains 'str', 'options', 'options.locale', etc.
        returnDoc,
    };
}

function generateValidatorsDocs() {
    const validators = fs
        .readdirSync(validatorsDir)
        .filter((name) => !name.endsWith('.js') && name !== 'index.js')
        .filter((name) => !['onlyFallback', 'testThrow'].includes(name)) // Excludes internal validators
        .map((name) => {
            const indexPath = path.join(validatorsDir, name, 'index.js');
            if (!fs.existsSync(indexPath)) return null;

            const sig = extractFunctionSignature(indexPath);
            return sig ? { ...sig, folder: name } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));

    return validators;
}

function generateSanitizersDocs() {
    const sanitizers = fs
        .readdirSync(sanitizersDir)
        .filter((name) => !name.endsWith('.js'))
        .map((name) => {
            const indexPath = path.join(sanitizersDir, name, 'index.js');
            if (!fs.existsSync(indexPath)) return null;

            const sig = extractFunctionSignature(indexPath);
            return sig ? { ...sig, folder: name } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));

    return sanitizers;
}

function generateParsersDocs() {
    const parsers = fs
        .readdirSync(parsersDir)
        .filter((name) => !name.endsWith('.js'))
        .map((name) => {
            const indexPath = path.join(parsersDir, name, 'index.js');
            if (!fs.existsSync(indexPath)) return null;

            const sig = extractFunctionSignature(indexPath);
            return sig ? { ...sig, folder: name } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));

    return parsers;
}

function generateFormattersDocs() {
    const formatters = fs
        .readdirSync(formattersDir)
        .filter((name) => !name.endsWith('.js'))
        .map((name) => {
            const indexPath = path.join(formattersDir, name, 'index.js');
            if (!fs.existsSync(indexPath)) return null;

            const sig = extractFunctionSignature(indexPath);
            return sig ? { ...sig, folder: name } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));

    return formatters;
}

function generateMarkdownTable(items, type) {
    let md = `| ${type} | Description & Parameters |\n|----------|--------------------------|\n`;

    for (const item of items) {
        const signature = `${item.name}(${item.params.join(', ')})`;

        const paramsMD =
            item.params.length > 0
                ? item.params
                      .map((p) => {
                          const doc = item.paramDocs[p];
                          if (!doc) {
                              return `- \`${p}\` — *Documentation not found.*`;
                          }
                          return `- \`${p}\`${doc.type ? `: \`${doc.type}\`` : ''}${doc.desc ? ` — ${doc.desc}` : ''}`;
                      })
                      .join(' ')
                : '';

        const description = item.description || 'No description available.';

        const cellContent = `${description}${paramsMD ? ' ' + paramsMD : ''}`;

        md += `| \`${signature}\` | ${cellContent} |\n`;
    }

    return md;
}

// Generate data
const validators = generateValidatorsDocs();
const sanitizers = generateSanitizersDocs();
const parsers = generateParsersDocs();
const formatters = generateFormattersDocs();

// Generate Markdown
const validatorsMD = generateMarkdownTable(validators, 'Validator');
const sanitizersMD = generateMarkdownTable(sanitizers, 'Sanitizer');
const parsersMD = generateMarkdownTable(parsers, 'Parser');
const formattersMD = generateMarkdownTable(formatters, 'Formatter');

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

// Write the files
fs.writeFileSync(path.join(docsDir, 'validators.md'), validatorsMD);
fs.writeFileSync(path.join(docsDir, 'sanitizers.md'), sanitizersMD);
fs.writeFileSync(path.join(docsDir, 'parsers.md'), parsersMD);
fs.writeFileSync(path.join(docsDir, 'formatters.md'), formattersMD);

console.log(`Documentation generated:
    - ${validators.length} validators
    - ${sanitizers.length} sanitizers
    - ${parsers.length} parsers
    - ${formatters.length} formatters`);
