const DEFAULT_SPACES = 2;

const DEFAULT_IMPORT_TYPE = 'ImportDefaultSpecifier';

const buildImport = (specifier) => {
  if (specifier.local.name === specifier.imported.name) {
    return `${specifier.imported.name}`;
  }

  return `${specifier.imported.name} as ${specifier.local.name}`;
};

const buildDefaultImport = (specifier) => {
  if (!specifier) {
    return '';
  }

  return `${specifier.local.name}, `;
};

const createMultilineFixer = (node, options) => (fixer) => {
  const numberOfSpaces = options[0] || DEFAULT_SPACES;
  const prefix = ' '.repeat(numberOfSpaces);

  const namedSpecifiers = node.specifiers.filter(s => s.type !== DEFAULT_IMPORT_TYPE);

  const namedImports = namedSpecifiers.length === 1
    ? `${buildImport(namedSpecifiers[0])}`
    : `\n${namedSpecifiers.map(s => `${prefix}${buildImport(s, numberOfSpaces)},`).join('\n')}\n`;

  const defaultImportSpecifier = node.specifiers.find(s => s.type === DEFAULT_IMPORT_TYPE);
  const defaultImport = buildDefaultImport(defaultImportSpecifier);

  const text = `import ${defaultImport}{${namedImports}} from ${node.source.raw};`;

  return fixer.replaceText(node, text);
};

const createSingleLineFixer = (node) => (fixer) => {
  const defaultImportSpecifier = node.specifiers.find(s => s.type === DEFAULT_IMPORT_TYPE);
  const defaultImport = buildDefaultImport(defaultImportSpecifier);

  const namedImport = node.specifiers.find(s => s.type !== DEFAULT_IMPORT_TYPE);

  const text = `import ${defaultImport}{ ${buildImport(namedImport)} } from ${node.source.raw};`;

  return fixer.replaceText(node, text);
};

module.exports = {
  rules: {
    'single-import-per-line': {
      meta: {
        type: 'layout',
        fixable: 'code',
        schema: [
          {
            type: 'integer',
            minimum: 0,
          },
        ],
      },
      create (context) {
        return {
          ImportDeclaration(node) {
            if (node.specifiers.length < 2) {
              return;
            }

            let previousImport = node.specifiers[0];
            for (let i = 1; i < node.specifiers.length; i++) {
              const currentImport = node.specifiers[i];

              if (previousImport.type !== DEFAULT_IMPORT_TYPE && currentImport.loc.start.line === previousImport.loc.end.line) {
                context.report({ node, message: 'One line per import', fix: createMultilineFixer(node, context.options) });
                return;
              }

              previousImport = currentImport;
            }
          },
        };
      },
    },
    'single-line-per-single-import': {
      meta: {
        type: 'layout',
        fixable: 'code',
        schema: [
          {
            type: 'integer',
            minimum: 0,
          },
        ],
      },
      create (context) {
        return {
          ImportDeclaration(node) {
            if (node.specifiers.length === 1 || (node.specifiers.length === 2 && node.specifiers[0].type === DEFAULT_IMPORT_TYPE)) {
              if (node.loc.start.line !== node.loc.end.line) {
                context.report({ node, message: 'Single import should span a single line', fix: createSingleLineFixer(node) });
              }
            }
          },
        };
      },
    },
  },
};
