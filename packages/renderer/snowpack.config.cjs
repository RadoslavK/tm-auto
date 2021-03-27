const path = require('path');

const typefaceRobotoFiles = path.join(__dirname, '../../node_modules/typeface-roboto/files');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: '..',
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
    //  generated graphiql SPA
    dist: '/dist',
    // https://github.com/snowpackjs/snowpack/discussions/1573
    [typefaceRobotoFiles]: '/files',
  },
  exclude: ['src/GraphiQL.tsx'],
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
    { match: 'routes', src: '/graphiql', dest: '/graphiql.html' },
    { match: 'routes', src: '!(graphiql)*', dest: '/index.html' },
  ],
  devOptions: {
    open: 'none',
  },
  packageOptions: {
    env: {
      ENV_NAME: true,
    },
  },
};