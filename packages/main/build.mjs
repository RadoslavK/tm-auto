import { build } from 'esbuild';

const isDevelopment = process.argv[2] !== 'production';
const isLocalMainBuild = process.argv[3] === 'main';
const serverDebugPort = isLocalMainBuild ? 9220: 9221;

//  Electron does not support ESM yet // https://github.com/electron/electron/issues/21457
/** @type(import("esbuild").BuildOptions) */
const options = {
  platform: 'node',
  target: 'node14.16',
  minify: !isDevelopment,
  define: {
    'process.env.NODE_ENV': `"${process.argv[2]}"`,
    'process.env.preferClientFromUrl': isLocalMainBuild,
    'process.env.serverDebugPort': serverDebugPort,
  },
  logLevel: 'warning',
  outdir: isDevelopment ? (isLocalMainBuild ? 'dist-dev' : 'dist-dev-app') : 'dist',
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
  bundle: true,
  external: [
    'electron', // provided by Electron itself
    'puppeteer', // can not be bundled because of chromium and it does not work when bundled even when custom chromium is in exec path https://github.com/puppeteer/puppeteer/issues/6902
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