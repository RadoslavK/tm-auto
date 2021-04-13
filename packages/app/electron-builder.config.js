module.exports = {
  appId: 'tm.auto',
  productName: 'TM Auto',
  copyright: 'Copyright © 2019-2021 ${author}',
  files: [
    './build/**/*',
  ],
  //  TODO load from package.json
  nodeVersion: '14.16.0',
  electronVersion: '12.0.2',
  asar: false,
  icon: '../renderer/public/images/TMAuto256.png',
  publish: null,
  win: {
    target: 'nsis',
  },
};