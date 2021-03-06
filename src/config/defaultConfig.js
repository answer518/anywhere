module.exports = {
    hostname: '127.0.0.1',
    port: 8881,
    root: process.cwd(),
    compress: /\.(html|js|css|md)$/,
    cache: {
        maxAge: true,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}
