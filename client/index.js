import Events from 'events'
import TerminalController from "./src/terminalController.js";

const events = new Events()
const terminalController = new TerminalController()

await terminalController.initializeTable(events)