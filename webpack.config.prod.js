const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/app.ts',
    output: {
        path:path.resolve(__dirname, "dist/scripts"),
        filename: "bundle.js",
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
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