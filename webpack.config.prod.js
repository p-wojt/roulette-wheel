const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/app.ts',
    output: {
        path:path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "./"),
        },
    },
};