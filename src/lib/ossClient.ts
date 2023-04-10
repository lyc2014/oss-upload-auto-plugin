const OSS = require('ali-oss')
interface OssCfgType {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
};
function ossClient (config: OssCfgType) {
    return new OSS(config)
}
export { OssCfgType }
export default ossClient