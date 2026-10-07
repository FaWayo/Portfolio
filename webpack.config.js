const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
const isProd = argv.mode === 'production';
return {
    mode: isProd ? 'production' : 'development',
    entry: {
        index: "./src/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash].js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Fatimah Alhassan Wayo', favicon: './src/assets/favicon.svg', template: './src/index.html', filename: 'index.html', chunks: ['index'] })
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
                // Files that must sit at the site root under their own names:
                // robots.txt, sitemap.xml, the share image and the icons.
                test: /[\\/]src[\\/]public[\\/]/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp|avif|mp4)$/i,
                exclude: /[\\/]src[\\/]public[\\/]/,
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
    // Size warnings only for the scripts that block the first paint; the video
    // and the share image load lazily or only for link previews.
    performance: {
        hints: isProd ? 'warning' : false,
        maxEntrypointSize: 450000,
        maxAssetSize: 450000,
        assetFilter: (file) => file.endsWith('.js'),
    },
    // Source maps for development only; the published site ships none.
    devtool: isProd ? false : 'source-map'
};
};