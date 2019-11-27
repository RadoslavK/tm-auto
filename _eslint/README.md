custom eslint plugin

test rules at https://astexplorer.net/

choose espree compiler and ESLint v4 transform

top left paste some code to test
bottom left can write test function like

export default function(context) {
  return {
    ImportDeclaration(node) {
      context.report({ node, message: 'hmm' });
    },
  };
}

once the rule is complete add it to project dependencies.
yarn add --dev file:./src/_eslint

then in .eslintrc.js add it to plugins first and then add rule