const webpack = require('webpack')
const config  = require('./webpack.config.js')
const compiler = webpack(config)

compiler.run((err, stats) => {
    console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
    }))
})