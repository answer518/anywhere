const http = require('http')
const path = require('path')
const chalk = require('chalk')
const config = require('./config/defaultConfig')
const route = require('./helper/router')

class Server {
    constructor(conf) {
        this.config = Object.assign(config, conf)
    }

    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.config.root, req.url)
            route(req, res, filePath, this.config)
        })

        server.listen(this.config.port, () => {
            const addr = `http://${this.config.hostname}:${this.config.port}`
            console.info(`Server stated at: ${chalk.green(addr)}`)
        })
    }
}

module.exports = Server
