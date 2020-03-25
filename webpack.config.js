module.exports = {
    entry:  __dirname + "/src/index.js",
    devtool: 'source-map',
    output: {
        path: __dirname + "/public/js",
        filename: "bundle-index.js"
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.tsx?$/,
    //             use: {
    //                 loader: 'ts-loader'
    //             }
    //         }
    //     ]
    // }
};
