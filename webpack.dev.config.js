const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");
const { SourceMapDevToolPlugin } = require("webpack");
const path = require("path");

let dotEnv = require("dotenv").config({ path: ".env" });
const port = process.env.PORT || 3000;

let env = {
  PORT: dotEnv.parsed.PORT,
  SERVER_DOMAIN: dotEnv.parsed.SERVER_DOMAIN_DEV,
  SERVER_PORT: dotEnv.parsed.SERVER_PORT,
};

module.exports = {
  entry: "./app/src/renderer.js",
  output: {
    path: __dirname + "/web",
    publicPath: "/",
    filename: "web-bundle.js",
  },
  devServer: {
    contentBase: "./web",
    port: port,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new Dotenv(dotEnv.parsed),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
  resolve: {
    alias: {
      Socket: path.resolve(__dirname, "app/src/socket.js"),
      Routes: path.resolve(__dirname, "app/src/routes.js"),
      Assets: path.resolve(__dirname, "app/assets/"),
      Reducers: path.resolve(__dirname, "app/src/reducers/"),
      Actions: path.resolve(__dirname, "app/src/actions/"),
      Scenes: path.resolve(__dirname, "app/src/Scenes/"),
      Layouts: path.resolve(__dirname, "app/src/Layouts/"),
      Components: path.resolve(__dirname, "app/src/Components/"),
      Hooks: path.resolve(__dirname, "app/src/hooks/"),
    },
    extensions: [".js", ".json", ".jsx"],
  },
};
