const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const extractCSS = new ExtractTextPlugin({
    filename: 'css/main.[name].[contenthash:8].css'
})
const extractSASS = new ExtractTextPlugin({
    filename: 'css/sass.[name].[contenthash:8].css'
})

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './app/main.js',
      //  vendor: ['jquery','react','react-dom']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].[hash:8].js'
    },
     resolve: {
        alias: {
            echarts: path.join(__dirname, './app/js/lib/echarts.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true //压缩
                        }
                    }]
                })
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/, /\.css$/],
                use: extractSASS.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            minimize: true //压缩
                        }
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
            test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    /*{
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[sha512:hash:base64:7].[ext]'
                        }
                    },*/
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[sha512:hash:base64:7].[ext]',
                            minimize: true //压缩
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)((-|\?)?.*)?$/,
                exclude: /img/,
                loader: 'url-loader',
                options: {
                    name: 'css/font/[name].[hash:8].[ext]',
                    minimize: true //压缩
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            echarts: 'echarts'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: require('autoprefixer')
            }
        }),
        new webpack.BannerPlugin("author by ldq-first"),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        extractCSS,
        extractSASS,
        new CleanWebpackPlugin(['dist']),
        /*new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // (选择 chunks，或者忽略该项设置以选择全部 chunks)
            minChunks: Infinity
            // 随着 entrie chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk
        }),*/
        /* 
        通过指定 entry 配置中未用到的名称，此插件会自动将我们需要的内容提取到单独的包中
        ，能够在每次修改后的构建结果中，将 webpack 的样板(boilerplate)和 manifest 提取出来。
        */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DllReferencePlugin({
           context: __dirname,
           manifest: require('./app/lib/manifest.json')
        }),
        //new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './app/lib'),
                to: path.join(__dirname, './build/lib'),
              //  ignore: ['.*']
            }
        ]),
        new WebpackNotifierPlugin({
            title: 'webpack 编译成功',
            contentImage: path.join(__dirname, './img/infoq.jpg'),
            alwaysNotify: true
        })
    ]
}