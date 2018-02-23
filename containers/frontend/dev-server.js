const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {

    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    watchOptions: {poll: true},
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}).listen(3000, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
    }

    console.log('[WEBPACK_DEV SERVER] Listening at 0.0.0.0:3000');
});
