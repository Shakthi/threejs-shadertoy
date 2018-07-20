const webpack = require('webpack')
const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: './src/three.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: '/js/',
        filename: 'three.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enable HMR
        new webpack.NamedModulesPlugin(),
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3001,
                proxy: 'http://localhost:8080/',
                files: [
                    {
                        match: ['**/*.html'],
                        fn: event => {
                            if (event === 'change') {
                                const bs = require('browser-sync').get(
                                    'bs-webpack-plugin'
                                )
                                bs.reload()
                            }
                        }
                    }
                ]
            },
            {
                reload: false
            }
        )
    ],
    devServer: {
        hot: true, // Tell the dev-server we're using HMR
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/js/'
    },
    watch: true,
    devtool: 'cheap-eval-source-map'
}
