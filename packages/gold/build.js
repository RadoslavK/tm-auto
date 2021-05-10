const { build } = require('esbuild');

const isDevelopment = process.argv[2] !== 'production';

/** @type(import("esbuild").BuildOptions) */
const options = {
  platform: 'node',
  target: 'node14.16',
  minify: !isDevelopment,
  define: {
    'process.env.NODE_ENV': `"${process.argv[2]}"`,
  },
  logLevel: 'warning',
  outdir: isDevelopment ? 'dist-dev' : 'dist',
  bundle: true,
  external: [
    'puppeteer-extra-plugin-stealth', // Puppeteer-extra loads plugins dependencies dynamically
  ],
};

const execute = async () => {
  await build({
    ...options,
    sourcemap: isDevelopment,
    entryPoints: [
      'src/index.ts',
    ],
  });
};

execute();