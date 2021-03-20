const path = require('path');
const typefaceRobotoFiles = path.join(__dirname, '../../node_modules/typeface-roboto/files');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
    // https://github.com/snowpackjs/snowpack/discussions/1573
    [typefaceRobotoFiles]: '/files',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-run-script',
      { cmd: 'yarn relay', watch: '$1 --watch', name: 'relay' },
    ],
    './relay.snowpack.cjs',
    './fonts.snowpack.cjs',
  ],
  routes: [
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  packageOptions: {
    namedExports: ['react-relay', 'relay-runtime'],
  },
  devOptions: {
    open: 'none',
  },
};
