const TerserPlugin = require('terser-webpack-plugin');
require("@babel/polyfill");

module.exports = {
  entry: [
    "@babel/polyfill",
    "./src/ShapefileDataParser.ts"
  ],
  mode: 'production',
  output: {
    filename: "shapefileParser.js",
    path: __dirname + "/browser",
    library: "GeoStylerShapefileParser"
  },
  resolve: {
    // Add '.ts' as resolvable extensions.
    extensions: [".ts", ".js", ".json"]
  },
  optimization: {
    minimizer: [
      new TerserPlugin()
    ]
  },
  module: {
    rules: [
      // All files with a '.ts'
      {
        test: /\.ts$/,
        include: __dirname + '/src',
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      }
    ]
  }
};
