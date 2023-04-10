import ossClient, { OssCfgType } from './lib/ossClient'
import slash from 'slash'
import allFiles from './lib/allDistFile'
import deployFiles from './lib/deployFiles'
const path = require('path')
interface PluginOptions {
    ossCfg: OssCfgType;
    ossPath?: string;
    headers?: any;
}
class OssUploadAutoPlugin {
    private _ossCfg
    private _ossClient: any
    private _ossPath: string;
    // private _headers: any
    constructor (options: PluginOptions) {
        let { ossCfg, ossPath, headers } = options
        this._ossClient = ossClient(ossCfg)
        this._ossCfg = ossCfg
        this._ossPath = ossPath
        // this._headers = headers
    }
    apply (compiler) {
        compiler.hooks.afterEmit.tap('OssUploadAutoPlugin', (compilation) => {
            const optionsError = this._checkOptions()
            if (optionsError) {
                compilation.errors.push(new Error(optionsError))
                return
            }
            let distPath = path.resolve(slash(compiler.options.output.path))
            let files = allFiles(distPath)
            let filesArr = files.map(item => ({
                absolutePath: item,
                relativePath: path.relative(distPath, item)
            }))
            if (filesArr.length > 0) {
                deployFiles(this._ossClient, this._ossPath, filesArr)
                return
            } else {
                console.warn('There is no files need to upload to oss')
                return
            }
            
        })
    }
    private _checkOptions (): string {
        let { region, accessKeyId, accessKeySecret, bucket } = this._ossCfg
        let errStr = ''
        if (!region) {
            errStr += '\nregion is not specified'
        }
        if (!accessKeyId) {
            errStr += '\naccessKeyId is not specified'
        }
        if (!accessKeySecret) {
            errStr += '\naccessKeySecret is not specified'
        }
        if (!bucket) {
            errStr += '\nbucket is not specified'
        }
        return errStr
    }
}
export default OssUploadAutoPlugin