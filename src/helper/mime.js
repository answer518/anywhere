const path = require('path')
/**
 * 可以根据不同的mime类型显示·不同的icon
 */
const mimeTyps = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'pdf': 'application/pdf',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'swf': 'application/x-shockwave-flash',
    'tiff': 'image/tiff',
    'txt': 'text/plain',
    'wav': 'audio/x-wav',
    'xml': 'text/xml'
}

module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLocaleLowerCase()
    if (!ext) {
        ext = filePath
    }

    return mimeTyps[ext] || mimeTyps['txt']
}
