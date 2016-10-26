var webpack = require('webpack')

module.exports = {
  entry: {
    // create two library bundles, one with jQuery and
    // another with Angular and related libraries\
    vendors: ['react', 'react-dom', 'react-router', 'history',
      'react-addons-pure-render-mixin','react-iscroll',
      'lodash', 'react-redux', 'redux', 'react-router-redux',
      'redux-thunk', 'redux-undo', 'jquery',
      "moment","highlight.js","react-toastr","classnames",
      "react-swipe",'iscroll'
    ]
  },

  output: {
    filename: '[name].bundle.js',
    path: './static/webpack-dll',

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: './static/webpack-dll/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_lib'
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
}
