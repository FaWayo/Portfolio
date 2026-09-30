const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Fatimah Wayo', template: './src/index.html', filename: 'index.html', chunks: ['index'] })
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp|avif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[contenthash][ext]'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'source-map'
}