// eslint-disable-next-line import/no-extraneous-dependencies
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').default;

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new UnusedFilesWebpackPlugin({
    globOptions: {
      ignore: [
        'src/client/preload.ts',
        'src/client/index.ts',
        'src/server/**/*.ts',
        '**/*.type.ts',
        '**/*.d.ts',
      ],
    },
    pattern: [
      'src/**/*.ts?(x)',
    ],
  }),
];
