module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  sourceRoot: 'src',
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime'
  ],
  env: {
    test: {
      presets: ['@babel/env'],
      plugins: ['require-context-hook']
    }
  }
};
