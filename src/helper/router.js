const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/defaultConfig')
const mime = require('../helper/mime')
const compress = require('../helper/compress')

const tplPath = path.join(__dirname, '../template/filedir.tpl')
const tpl = fs.readFileSync(tplPath)
const template = Handlebars.compile(tpl.toString())

module.exports = async (req, res, filePath) => {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mime(filePath)
            res.setHeader('Content-Type', contentType)
            req.statusCode = 200
            let rs = fs.createReadStream(filePath)
            if (filePath.match(config.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if(stats.isDirectory()) {
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
