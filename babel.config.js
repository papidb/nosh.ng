module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          action: './src/action',
          assets: './src/assets',
          constants: './src/constants',
          components: './src/components',
          navigation: './src/navigation',
          screens: './src/screens',
          hooks: './src/hooks',
          helpers: './src/helpers',
          services: './src/services',
          styles: './src/styles',
          utils: './src/utils',
        },
      },
    ],
    // ['@shopify/react-i18n/babel', {mode: 'from-dictionary-index'}],
    'react-native-reanimated/plugin',
  ],
};
