import path from 'path';
import extend from 'extend';

const common = {
    stats: {
        colors: true,
        chunks: false
    },
    mode: 'development'
};

const client = extend(true, {}, common, {
    entry: path.join(__dirname, '../client.js'),
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../build/public'),
        filename: 'client.js'
    },
    module: {
        rules : [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, '../components'),
                    path.join(__dirname, '../core'),
                    path.join(__dirname, '../routes'),
                    path.join(__dirname, '../client.js'),
                    path.join(__dirname, '../server.js')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                query: {limit: 1000}
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, '../components')
                ],
                use : [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:3]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins : loader => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('precss')(),
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            }
        ]
    }
});

const server = extend(true, {}, common,  {
    entry: path.join(__dirname, '../server.js'),
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        buffer: false,
        __filename: false,
        __dirname: false
    },
    externals: /^[a-z][a-z\/\.\-0-9]*$/i,
    module : {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, '../components'),
                    path.join(__dirname, '../core'),
                    path.join(__dirname, '../routes'),
                    path.join(__dirname, '../client.js'),
                    path.join(__dirname, '../server.js')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                query: {limit: 1000}
            },
            {
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, '../components')
                ],
                use : [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:3]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins : loader => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                require('precss')(),
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            }
        ]
    }
});

// server.module.rules
//     .forEach(x=> {
//         const util = require('util')
//         console.log(util.inspect(x, false, null))
//         // console.log('loader' + x);
        
//         if(x.loader.startsWith('css-loader')){
//             x.loader = 'css-loader/locals' +  x.loader.substr(23)
//         }

//         if(x.loader.startsWith('style-loader')){
//             x.loader = ''
//         }
        
//     })

export default [client, server];