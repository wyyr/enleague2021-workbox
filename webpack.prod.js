const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = merge(config, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new GenerateSW({
      ignoreURLParametersMatching: [/.*/],
      mode: 'production',
      runtimeCaching: [
        {
          urlPattern: new RegExp('/'),
          handler: 'CacheFirst',
          method: 'GET',
          options: {
            cacheName: 'Runtime',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24,
            },
          },
        },
        {
          urlPattern: new RegExp('https://api.football-data.org/v2/'),
          handler: 'StaleWhileRevalidate',
          method: 'GET',
          options: {
            cacheName: 'Football API',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24,
              maxEntries: 60,
            },
          },
        },
      ],
      importScripts: ['sw.bundle.js'],
    }),
  ],
});
