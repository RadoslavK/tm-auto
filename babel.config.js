module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const isDevelopment = !api.env('production');

  return {
    sourceType: 'unambiguous',
    presets: [
      ['@babel/preset-env', {
        corejs: 2,
        useBuiltIns: 'entry',
        targets: {
          electron: 12,
        },
      }],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      'macros',
      '@babel/plugin-transform-runtime',
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
    ],
    retainLines: isDevelopment,
    sourceMaps: isDevelopment,
  };
};
