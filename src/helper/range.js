module.exports = (totalSize, req, res) => {
    const range = req.headers['range']
    if (!range) {
        return {
            code: 200
        }
    }

    const sizes = range.match(/bytes=(\d*)-(\d*)/)
    const begin = sizes[1] || totalSize - end
    const end = sizes[2] || totalSize - 1

    if(begin > end || begin < 0 || end > totalSize) {
         return {
             code: 200
         }
    }
    res.setHeader('Accept-Ranges', 'bytes')
    res.setHeader('Content-Range', `bytes ${begin}-${end}/${totalSize}`)
    res.setHeader('Content-Length', end - begin)

    return {
        code: 206,
        begin: parseInt(begin),
        end: parseInt(end)
    }
}
