const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, 'app/static'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css)$/,
        loader: ['style-loader','css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    alias: {
        components: path.resolve(__dirname, 'src/components'),
        shared: path.resolve(__dirname, 'src/components/shared'),
        pages: path.resolve(__dirname, 'src/pages'),
        data: path.resolve(__dirname, 'src/data'),
        styles: path.resolve(__dirname,'src/styles')
    },
    extensions: ['.js', '.scss']
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'app/static'),
    port: 5000
  }
}