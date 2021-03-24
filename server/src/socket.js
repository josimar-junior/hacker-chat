import http from 'http'
import {v4 as uuid} from 'uuid'
import { constants } from './constants.js'

export default class SocketServer {
    constructor({port}) {
        this.port = port
    }

    async initialize(eventEmmiter) {
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Hey there!!')
        })

        server.on('upgrade', (req, socket) => {
            socket.id = uuid()
            const headers = [
                'HTTP/1.1 101 Web Socket Protocol Handshake',
                'Upgrade: Websocket',
                'Connection: Upgrade',
                ''
            ].map(line => line.concat('\r\n')).join('')

            socket.write(headers)
            eventEmmiter.emit(constants.events.NEW_USER_CONNECTED, socket)
        })

        return new Promise((resolve, reject) => {
            server.on('error', reject)
            server.listen(this.port, () => resolve(server))
        })
    }
}