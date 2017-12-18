const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./path.js');
module.exports = {
    devtool: 'source-map',
    entry: {
     /*   creditManagement: path.resolve(__dirname, './src/module/creditManagement/creditManagement.js'),
        guaranteeProcess: path.resolve(__dirname, './src/module/guaranteeProcess/guaranteeProcess.js'),
        inOutManagement: path.resolve(__dirname, './src/module/inOutManagement/inOutManagement.js'),
        payroll:path.resolve(__dirname, './src/module/payroll/payroll.js'),
        payrollAdjust:path.resolve(__dirname, './src/module/payrollAdjust/payrollAdjust.js'),
        loanRepayManagement:path.resolve(__dirname, './src/module/loanRepayManagement/loanRepayManagement.js'),
        inOutDepositManagement: path.resolve(__dirname, './src/module/inOutDepositManagement/inOutDepositManagement.js'),
        wageSetting:path.resolve(__dirname, './src/module/wageSetting/wageSetting.js'),
        typeSetting:path.resolve(__dirname, './src/module/typeSetting/typeSetting.js'),
        awardConfig:path.resolve(__dirname, './src/module/awardConfig/awardConfig.js'),   */     
        
        statistics:path.resolve(__dirname,'./src/module/statistics/statistics.js')
    },
    output: {
        path: path.resolve(base.path),
        publicPath: './../',
        filename: 'js/[name].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'html/statistics.html',
            template: './src/module/statistics/statistics.html',
            inject: true,
            chunks: ['statistics']
        }),
        /*new HtmlWebpackPlugin({
            filename: 'html/inOutDepositManagement.html',
            template: './src/module/inOutDepositManagement/inOutDepositManagement.html',
            inject: true,
            chunks: ['inOutDepositManagement']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/creditManagement.html',
            template: './src/module/creditManagement/creditManagement.html',
            inject: true,
            chunks: ['creditManagement']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/loanRepayManagement.html',
            template: './src/module/loanRepayManagement/loanRepayManagement.html',
            inject: true,
            chunks: ['loanRepayManagement']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/guaranteeProcess.html',
            template: './src/module/guaranteeProcess/guaranteeProcess.html',
            inject: true,
            chunks: ['guaranteeProcess']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/wageSetting.html',
            template: './src/module/wageSetting/wageSetting.html',
            inject: true,
            chunks: ['wageSetting']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/awardConfig.html',
            template: './src/module/awardConfig/awardConfig.html',
            inject: true,
            chunks: ['awardConfig']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/typeSetting.html',
            template: './src/module/typeSetting/typeSetting.html',
            inject: true,
            chunks: ['typeSetting']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/inOutManagement.html',
            template: './src/module/inOutManagement/inOutManagement.html',
            inject: true,
            chunks: ['inOutManagement']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/payroll.html',
            template: './src/module/payroll/payroll.html',
            inject: true,
            chunks: ['payroll']
        }),
        new HtmlWebpackPlugin({
            filename: 'html/payrollAdjust.html',
            template: './src/module/payrollAdjust/payrollAdjust.html',
            inject: true,
            chunks: ['payrollAdjust']
        }),*/
        new webpack.DllReferencePlugin({
            manifest: require(base.path + '/vendor-manifest.json')
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!less-loader' }),
                        css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' })
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'imgs/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    devServer: {
        port: 8083,
        historyApiFallback: true,
        noInfo: true,
        contentBase: './src/module/loanRepayManagement/loanRepayManagement.html'
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}