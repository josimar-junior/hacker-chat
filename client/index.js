import Events from 'events'
import CliConfig from './src/cliConfig.js';
import EventManager from './src/eventManager.js';
import SocketClient from './src/socket.js';
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...commands] = process.argv

const config = CliConfig.parseArguments(commands)

const componentEmmiter = new Events()

const socketClient = new SocketClient(config)
await socketClient.initialize()

const eventManager = new EventManager({componentEmmiter, socketClient})
const events = eventManager.getEvents()
socketClient.attachEvents(events)
const data = {
    roomId: config.room,
    userName: config.username
}
eventManager.joinRoomAndWaitForMessages(data)

const terminalController = new TerminalController()
await terminalController.initializeTable(componentEmmiter)