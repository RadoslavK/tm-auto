import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import nodePolyfills from 'rollup-plugin-polyfill-node';

/** @type{import("rollup").MergedRollupOptions} */
const config = {
  input: 'src/GraphiQL.tsx',
  output: [{
    file: './dist/GraphiQL.js',
    format: 'esm',
  }],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs({
      transformMixedEsModules: true,
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      include: [
        'src/**/*',
        //  the plugin checks only the root by default
        '../shared/**/*',
      ],
    }),
    css({
      output: 'GraphiQL.css',
    }),
    json(),
    nodePolyfills({
      include: [
        'process',
      ],
    }),
  ],
};

export default config;