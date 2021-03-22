const babel = require('@babel/core');
const { join } = require('path');

/** @type {import("snowpack").SnowpackPluginFactory } */
module.exports = (snowpackConfig, pluginOptions) => ({
  name: 'relay-replace',
  async transform({ id, contents, fileExt }) {
    if (!(id.includes(join(__dirname), 'src') && fileExt === '.js')) {
      return;
    }

    const result = await babel.transformAsync(contents, {
      filename: id,
      ast: true,
      targets: {
        esmodules: true,
      },
      plugins: [
        ['macros', {
          relay: {
            artifactDirectory: './src/_graphql/__generated__',
            eagerESModules: true,
          },
        }],
      ],
    });

    const modules = ['react-relay/hooks'];
    const regexp = new RegExp("^import (?<variableName>((?!from).|\n)*?) from (?<moduleName>(?:'|\")(?:"+modules.join('|')+")(?:'|\")).*$", "gm");
    const replacement = `
import reactRelayPkg from $<moduleName>;
const $<variableName> = reactRelayPkg;
    `;

    return result.code.replace(regexp, replacement);
  },
});