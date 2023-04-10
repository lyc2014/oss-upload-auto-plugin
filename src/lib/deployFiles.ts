import slash from 'slash'
const ora = require('ora')
const path = require('path')
interface FilesInfoType {
    absolutePath: string;
    relativePath: string;
}
function deployFiles (client, ossPath: string, files: FilesInfoType[]) {
    let filesCounts = files.length
    let uploadedCount = 0
    const spinner = ora({ test: 'uploading...', color: 'yellow' }).start()
    try {
        putFile(client, files)
    } catch (e) {
        console.error('Failed to upload to ali oss, ' + e)
    }
    
    function putFile (client, _files) {
        _files = _files || []
        var file = _files.shift()
        if (file && Object.prototype.toString.call(file).slice(8, -1) === 'Object') {
            let remoteOssPath = slash(path.join(ossPath, file.relativePath))
            client.put(remoteOssPath, file.absolutePath).then(() => {
                uploadedCount++
                if (uploadedCount === filesCounts) {
                    spinner.succeed('done')
                } else {
                    spinner.text = `uploaded ${(uploadedCount / filesCounts * 100).toFixed(2)}%`
                }
                putFile(client, _files)
            })
        } else {
            return
        }
    }
}
export default deployFiles