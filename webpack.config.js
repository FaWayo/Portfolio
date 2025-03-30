const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.ts",
        projects: "./src/projects/projects.ts",
        about: "./src/about/about.ts",
        blog: "./src/blog/blog.ts"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Home Page', template: './src/index.html', filename: 'index.html', chunks: ['index'] }),
        new HtmlWebpackPlugin({ title: 'Projects Page', template: './src/projects/projects.html', filename: 'projects.html', chunks: ['projects'] }),
        new HtmlWebpackPlugin({ title: 'About Page', template: './src/about/about.html', filename: 'about.html', chunks: ['about'] }),
        new HtmlWebpackPlugin({ title: 'Blog Page', template: './src/blog/blog.html', filename: 'blog.html', chunks: ['blog'] })
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
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
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
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'source-map'
}