const http = require('http')
const path = require('path')
const chalk = require('chalk')
const config = require('./config/defaultConfig')
const route = require('./helper/router')

const server = http.createServer((req, res) => {
    const filePath = path.join(config.root, req.url)
    route(req, res, filePath)
})

server.listen(config.port, () => {
    const addr = `http://${config.hostname}:${config.port}`
    console.info(`Server stated at: ${chalk.green(addr)}`)
})
