var webpack = require('webpack');
var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build'),
    node_modules: path.join(__dirname, 'node_modules')
};

var config = {
    //Entry points to the project
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app.jsx')
    ],
    //Config options on how to interpret requires imports
    resolve: {
        extensions: ["", ".js", ".jsx"]
        //node_modules: ["web_modules", "node_modules"]  (Default Settings)
    },
    //Server Configuration options
    devServer:{
        contentBase: PATHS.build,  //Relative directory for base of server
        devtool: 'eval',
        hot: true,        //Live-reload
        inline: true,
        port: 3000        //Port Number
    },
    devtool: 'eval',
    output: {
        path: PATHS.build,    //Path of output file
        filename: 'bundle.js'
    },
    plugins: [
      //Enables Hot Modules Replacement
      new webpack.HotModuleReplacementPlugin()//,
    //   //Allows error warnings but does not stop compiling. Will remove when eslint is added
    //   new webpack.NoErrorsPlugin(),
    //   //Moves files
    //   new TransferWebpackPlugin([
    //     {from: '.'}
    //   ], path.resolve(__dirname, "src"))
    ],
    module: {
        //Loaders to interpret non-vanilla javascript code as well as most other extensions including images and text.
        preLoaders: [
            {
                //Eslint loader
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                include: [PATHS.src],
                exclude: /node_modules/
            },
        ],
        loaders: [
            {
                //React-hot loader and
                test: /\.(js|jsx)$/,  //All .js and .jsx files
                loaders: ['react-hot', 'babel-loader'], //react-hot is like browser sync and babel loads jsx and es6-7
                exclude: /node_modules/
            },
            {
                // CSS loader
                test: /\.css$/,
                loader: 'style!css!'
            }
        ]
    },
    //eslint config options. Part of the eslint-loader package
    eslint: {
      configFile: '.eslintrc'
    },
};

module.exports = config;
