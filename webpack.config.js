const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')

const config = require('./internals/config.js')()

// Output base directory
const outputPath = path.join(__dirname, config.outputPath)

// static prefix where the static files will be served on the webserver
// Eg: /static/ will be: http://localhost:7000/static/js/index.js
const staticPath = config.publicPath

// Root app directory
const context = path.join(__dirname, config.appFolder)

module.exports = [
  {
    name: 'js',
    devtool: 'source-map',
    context: context,
    entry: {
      index: [
        './index.js',
      ],
    },
    output: {
      path: path.join(outputPath, config.outputPathSubFolder, config.outputPathJsFolder),
      filename: '[name].js',
      publicPath: path.posix.join(staticPath, config.outputPathJsFolder),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            failOnWarning: false,
            failOnError: false,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: [
              'transform-react-jsx',
              [
                'react-css-modules',
                {
                  context,
                  'generateScopedName': '[name]__[local]___[hash:base64:5]',
                  filetypes: {
                    '.scss': {
                      'syntax': 'postcss-scss',
                    },
                  },
                },
              ],
            ],
          },
        },
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            publicPath: path.posix.join(staticPath, config.outputPathCssFolder),
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                },
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true },
              },
            ],
          }),
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/,
          exclude: /fonts/,
          loader: 'file-loader?name=[path][name].[ext]',
        },
        {
          test: /\.(woff|woff2|ttf|eot|otf|svg)$/,
          exclude: /img/,
          loader: 'file-loader?name=[path][name].[ext]',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '../css/index.css',
        disable: false,
        allChunks: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    ],
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
  {
    name: 'vendor',
    context: context,
    entry: {
      vendor: './vendor.js',
    },
    output: {
      path: path.join(outputPath, config.outputPathSubFolder, config.outputPathJsFolder),
      filename: 'vendor.js',
      publicPath: path.posix.join(staticPath, config.outputPathJsFolder),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'img/**',
          to: path.posix.join(outputPath, config.outputPathSubFolder),
        },
        {
          from: 'fonts/**',
          to: path.posix.join(outputPath, config.outputPathSubFolder),
        },
        {
          from: 'favicons/**',
          to: path.posix.join(outputPath, config.outputPathSubFolder),
        },
        {
          from: 'index.html',
          to: path.posix.join(outputPath),
        },
      ]),
    ],
  },
  {
    name: 'style',
    devtool: 'source-map',
    context: context,
    entry: {
      styles: [
        './scss/index.scss',
      ],
    },
    output: {
      path: path.join(outputPath, config.outputPathSubFolder, config.outputPathCssFolder),
      filename: 'index.css',
      publicPath: path.posix.join(staticPath, config.outputPathCssFolder),
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            publicPath: path.posix.join(staticPath, config.outputPathCssFolder),
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                },
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true },
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'index.css',
        disable: false,
        allChunks: true,
      }),
    ],
  },
]
