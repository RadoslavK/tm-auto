import { build } from 'esbuild';

const isDevelopment = process.env.NODE_ENV !== 'production';

/** @type {import("esbuild").BuildOptions} */
const options = {
  platform: 'node',
  target: 'node14.6',
  minify: !isDevelopment,
  define: {
    NODE_ENV: process.env.NODE_ENV,
  },
  logLevel: 'warning',
  sourcemap: isDevelopment,
  outdir: 'dist',
};

await build({
  ...options,
  entryPoints: [
    'src/index.ts',
    'src/preload.ts',
  ],
  outExtension: {
    '.js': '.cjs',
  },
  bundle: true,
  external: [
    'electron',
  ],
});

await build({
  ...options,
  format: 'esm',
  entryPoints: [
    'src/server.ts',
  ],
  outExtension: {
    '.js': '.mjs',
  },
  bundle: !isDevelopment,
  external: isDevelopment
    ? undefined
    : [
      'puppeteer-core',
      'puppeteer-extra',
      'puppeteer-extra-plugin-stealth',
      'jsdom',
    ],
});