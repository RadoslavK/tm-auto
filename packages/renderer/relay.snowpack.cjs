const babel = require('@babel/core');
const { join } = require('path');

/** @type {import("snowpack").SnowpackPluginFactory } */
module.exports = (snowpackConfig, pluginOptions) => ({
  name: 'relay-replace',
  async transform({ id, contents, fileExt }) {
    if (!(id.includes(join(__dirname), 'src') && fileExt === '.js' && !id.endsWith('GraphiQL.js'))) {
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

    //  TODO improve this thing
    const relayHooksModule = ['react-relay/hooks'];
    const relayHooksModuleRegExp = new RegExp("^import (?<variableName>((?!from).|\n)*?) from (?<moduleName>(?:'|\")(?:"+relayHooksModule+")(?:'|\")).*$", "gm");
    const relayHooksModuleReplacement = `
import reactRelayHooksPkg from $<moduleName>;
const $<variableName> = reactRelayHooksPkg;
    `;

    const relayRuntime = ['relay-runtime'];
    const relayRuntimeRegExp = new RegExp("^import (?<variableName>((?!from).|\n)*?) from (?<moduleName>(?:'|\")(?:"+relayRuntime+")(?:'|\")).*$", "gm");
    const relayRuntimeReplacement = `
import relayRuntimePkg from $<moduleName>;
const $<variableName> = relayRuntimePkg;
    `;

    return result.code
      .replace(relayHooksModuleRegExp, relayHooksModuleReplacement)
      .replace(relayRuntimeRegExp, relayRuntimeReplacement);
  },
});