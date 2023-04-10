const fs = require('fs')
const path = require('path')
function allFiles(dir: string, _files: string[] = []) {
    var files = fs.readdirSync(dir)
    for (var i in files) {
        var name = path.join(dir, files[i])
        if (fs.statSync(name).isDirectory()) {
            allFiles(name, _files)
        } else {
            _files.push(name)
        }
    }
    return _files
}
export default allFiles
