import Events from 'events'
import CliConfig from './src/cliConfig.js';
import SocketClient from './src/socket.js';
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...commands] = process.argv

const config = CliConfig.parseArguments(commands)

const events = new Events()
const terminalController = new TerminalController()

const socketClient = new SocketClient(config)
await socketClient.initialize()

await terminalController.initializeTable(events)