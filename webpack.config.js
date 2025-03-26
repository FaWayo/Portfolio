const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: "none",
    entry: { index: "./src/index.js", projects: "./src/projects/projects.js", about: "./src/about/about.js", blog: "./src/blog/blog.js" },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: "[name].js"
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
            }
        ]
    }
}