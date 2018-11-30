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
  plugins: ['@babel/proposal-class-properties'],
  env: {
    test: {
      presets: ['@babel/env'],
      plugins: ['require-context-hook']
    }
  }
};
