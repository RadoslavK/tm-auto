import { build } from 'esbuild';

const isDevelopment = process.env.NODE_ENV !== 'production';

await build({
  platform: 'node',
  target: 'node14.16',
  minify: !isDevelopment,
  define: {
    NODE_ENV: process.env.NODE_ENV,
  },
  logLevel: 'warning',
  sourcemap: isDevelopment,
  outdir: 'dist',
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
  bundle: true,
  entryPoints: [
    'src/index.ts',
    'src/preload.ts',
    'src/server.ts',
  ],
  external: [
    'electron',
    'puppeteer-core',
    'puppeteer-extra',
    'puppeteer-extra-plugin-stealth',
    'jsdom',
  ],
});