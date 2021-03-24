import Event from 'events'
import { constants } from './constants.js'
import Controller from './controller.js'
import SocketServer from './socket.js'

const eventEmmiter = new Event()

const port = process.env.PORT || 9898
const socketServer = new SocketServer({port})
const server = await socketServer.initialize(eventEmmiter)
console.log('Socket server is running at', server.address().port)

const controller = new Controller({socketServer})
eventEmmiter.on(
    constants.events.NEW_USER_CONNECTED,
    controller.onNewConnection.bind(controller)
)