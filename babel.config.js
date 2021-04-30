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
          selectors: './src/selectors',
          logger: './src/shared/logger',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
    // ['@shopify/react-i18n/babel', {mode: 'from-dictionary-index'}],
    'react-native-reanimated/plugin',
  ],
};
