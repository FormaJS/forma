const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const _terserMod = require('@rollup/plugin-terser');
const terser = _terserMod.terser || _terserMod.default || _terserMod;

module.exports = [
  // ESM + CJS builds
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/index.esm.js', format: 'es', sourcemap: false, exports: 'named' },
      { file: 'dist/index.cjs', format: 'cjs', sourcemap: false, exports: 'named' },
    ],
    plugins: [resolve(), commonjs(), json(), terser()],
  },
  // UMD minified
  {
    input: 'src/umd-entry.js',
    output: {
      file: 'dist/formajs.umd.min.js',
      format: 'umd',
      name: 'forma',
      exports: 'named',
    },
    plugins: [resolve(), commonjs(), json(), terser()],
  },
  // Preserve modules: generate per-file ESM layout under dist/esm
  {
    input: 'src/index.js',
    output: {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].js',
      exports: 'named',
    },
    plugins: [resolve(), commonjs(), json(), terser()],
  },
  // Preserve modules CJS layout under dist/cjs (use .cjs extensions)
  {
    input: 'src/index.js',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].cjs',
      exports: 'named',
    },
    plugins: [resolve(), commonjs(), json(), terser()],
  },
];
