const path = require('path')
const MyOssPlugin = require('../dist/index.cjs')
/**
 *   ossCfg = {
 *      region: 'xxxx',
        accessKeyId: 'xxxxx',
        accessKeySecret: 'xxxxx',
        bucket: 'xxxxx'
     }
 */
const ossCfg = require('./_oss.js')
module.exports = {
    context: path.resolve(__dirname),
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    stats: 'errors-only',
    mode: 'development',
    plugins: [
        new MyOssPlugin({
            ossCfg: ossCfg,
            ossPath: 'testplugin'
        })
    ]
}