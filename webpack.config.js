const path = require('path'); // CommonJS

module.exports = {
  mode: 'production',
  entry: {
    main: './frontend/main.js',
    login: './frontend/assets/js/login.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devtool: 'source-map',
};