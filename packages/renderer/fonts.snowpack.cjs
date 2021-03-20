const path = require('path');
const cpy = require('cpy');

// https://github.com/snowpackjs/snowpack/discussions/1573
/** @type {import("snowpack").SnowpackPluginFactory } */
module.exports = (snowpackConfig, pluginOptions) => ({
  name: 'fonts',
  async optimize({ buildDirectory }) {
    const source = path.join(__dirname, '../../node_modules/typeface-roboto/files/*.{woff,woff2}');
    const destination = path.join(buildDirectory, 'files');

    await cpy(source, destination);
  },
});