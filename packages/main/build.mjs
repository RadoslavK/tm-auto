import { build } from 'esbuild';

const isDevelopment = process.argv[2] !== 'production';

//  Electron does not support ESM yet // https://github.com/electron/electron/issues/21457
/** @type(import("esbuild").BuildOptions) */
const options = {
  platform: 'node',
  target: 'node14.16',
  minify: !isDevelopment,
  define: {
    'process.env.NODE_ENV': `"${process.argv[2]}"`,
  },
  logLevel: 'warning',
  outdir: isDevelopment ? 'dist' : 'dist-prod',
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
  bundle: true,
  external: [
    'electron', // provided by Electron itself
    'puppeteer-extra-plugin-stealth', // Puppeteer-extra loads plugins dependencies dynamically
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