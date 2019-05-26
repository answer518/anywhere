const { cache } = require('../config/defaultConfig')
function flushCache(stats, res) {
    const { maxAge, expires, cacheControl, lastModified, etag } = cache

    if (expires) {
        res.setHeader('expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }

    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }

    if (etag) {
        res.setHeader('ETag', `${stats.size} - ${stats.mtime}`)
    }
}

module.exports = function isCached(stats, req, res) {
    flushCache(stats, res)
    const lastModified = req.headers['if-modified-since']
    const etag = req.headers['if-none-match']
    if (!lastModified && !etag) {
        return false
    }

    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false
    }

    if (etag && etag !== res.getHeader('ETag')) {
        return false
    }

    return true
}
