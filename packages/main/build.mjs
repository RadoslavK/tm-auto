import { build } from 'esbuild';

const isDevelopment = process.env.NODE_ENV !== 'production';

//  Electron does not support ESM yet // https://github.com/electron/electron/issues/21457
/** @type(import("esbuild").BuildOptions) */
const options = {
  platform: 'node',
  target: 'node14.16',
  minify: !isDevelopment,
  define: {
    NODE_ENV: process.env.NODE_ENV,
  },
  logLevel: 'warning',
  outdir: 'dist',
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
  bundle: true,
  external: [
    'electron',
    'puppeteer-core',
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
    'jsdom',
  ],
};

await build({
  ...options,
  sourcemap: isDevelopment,
  entryPoints: [
    'src/index.ts',
    'src/server.ts',
  ],
});

//  separate source map file is not picked by browser for preload script
await build({
  ...options,
  sourcemap: isDevelopment ? 'inline' : false,
  entryPoints: ['src/preload.ts'],
});