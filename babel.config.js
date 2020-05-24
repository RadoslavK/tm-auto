module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return ({
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
    presets: [
      '@babel/env',
      '@babel/react',
      '@babel/typescript',
    ],
    retainLines: true,
    sourceMaps: true,
  });
};
