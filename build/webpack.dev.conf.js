const path = require("path");
const { merge } = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.conf");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const chalk = require("chalk");

const port = "8008";

// 取本机IP地址
const getIPAdress = () => {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        conlg.push(
          chalk.blueBright.bold("Your application is running here: ") +
            chalk.greenBright.bold(`http://${alias.address}:${port}/`)
        );
      }
    }
  }
};

let conlg = [];
getIPAdress();
conlg.push(
  chalk.blueBright.bold("Your application is running here: ") +
    chalk.greenBright.bold(`http://localhost:${port}/`)
);

let webpackConfigDev = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {},
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: conlg,
      },
    }),
  ],
  devServer: {
    // webpack-dev-server 会从 output.path 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 进行访问。
    open: false, // 启动服务后是否打开浏览器
    host: "0.0.0.0",
    port: port, // 服务端口
    https: false,
    hot: true,
    historyApiFallback: true,
    // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: {},
  },
};

module.exports = merge(webpackConfigBase(false), webpackConfigDev);
