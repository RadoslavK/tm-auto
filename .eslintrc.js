module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "promise",
    "unicorn",
    "react-hooks",
    "simple-import-sort",
    "tm-auto",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
  },
  overrides: [
    {
      "files": ["**/*.jsx", "**/*.tsx"],
      "rules": {
        "unicorn/filename-case": ["error", { "case": "pascalCase" }],
      },
    },
    {
      "files": ["**/index.jsx", "**/index.tsx"],
      "rules": {
        "unicorn/filename-case": ["error", { "case": "camelCase" }],
      },
    }
  ],
  settings: {
    "import/resolver": {
      "node": {},
      "webpack": {
        "config": "webpack.renderer.config.js",
      },
    },
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "lines-between-class-members": "off",
    "no-plusplus": "off",
    "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
    "react/prop-types": "off",
    "react/no-array-index-key": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "unicorn/filename-case": ["error", { "case": "camelCase" }],
    "@typescript-eslint/ban-ts-ignore": "warn",
    "unicorn/explicit-length-check": "off",
    "no-await-in-loop": "warn",
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    "no-param-reassign": "warn",
    "unicorn/prefer-text-content": "warn",
    "jsx-a11y/control-has-associated-label": "off",
    "import/no-unresolved": "error",
    "jsx-a11y/label-has-associated-control": "off",
    "semi": "error",
    "react/jsx-key": "error",
    "object-curly-spacing": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "operator-linebreak": "error",
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-multi-spaces": "error",
    "new-parens": "error",
    "key-spacing": "error",
    "jsx-quotes": "error",
    "no-unused-vars": ["error", { "args": "after-used", "ignoreRestSiblings": true, "caughtErrors": "all" }],
    "quote-props": "error",
    "quotes": "error",
    "comma-dangle": "error",
    "array-bracket-spacing": "error",
    "array-bracket-newline": "error",
    "array-element-newline": "error",
    "object-curly-newline": ["error", { "ObjectPattern": { "multiline": true, "minProperties": 4, "consistent": true }, "ObjectExpression": { "multiline": true, "minProperties": 4, "consistent": true }, "ImportDeclaration": { "multiline": true, "minProperties": 2, "consistent": true }, "ExportDeclaration": { "multiline": true, "minProperties": 2, "consistent": true } }],
    "import/order": "off",
    "simple-import-sort/sort": "error",
    "no-trailing-spaces": "error",
    "indent": "error",
    "max-len": ["warn", { "code": 120 }],
    "comma-spacing": "error",
    "brace-style": "error",
    "no-console": "off",
    "tm-auto/single-import-per-line": "error",
    "tm-auto/single-line-per-single-import": "error"
  },
};
