const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isCached = require('./cache')

const tplPath = path.join(__dirname, '../template/filedir.tpl')
const tpl = fs.readFileSync(tplPath)
const template = Handlebars.compile(tpl.toString())

module.exports = async (req, res, filePath, config) => {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mime(filePath)
            res.setHeader('Content-Type', `${contentType}; charset=utf8;`)
            if(isCached(stats, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }
            let rs;
            const { code, begin, end } = range(stats.size, req, res)
            if (code === 200) {
                res.statusCode = 200
                rs = fs.createReadStream(filePath)
            } else {
                res.statusCode = 216
                rs = fs.createReadStream(filePath, { start: begin, end: end })
            }
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if (stats.isDirectory()) {
            res.setHeader('Content-Type', mime('html'))
            const files = await readdir(filePath)
            req.statusCode = 200
            const dir = path.relative(config.root, filePath)
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            }
            res.end(template(data))
        }
    } catch (error) {
        req.statusCode = 404
        res.setHeader('Content-Type', mime('txt'))
        res.end(`${filePath} is not a directory or file\n${error.toString()}`) // 错误信息在线上环境显示的话会有风险，需要区分一下开发环境
    }
}
