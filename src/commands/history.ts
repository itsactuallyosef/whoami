import { loopLines } from "../animation";
import HistoryManager from "../util/HistoryManager";
import utility from "../utility";
import { Command, CommandError } from "./abstract";

class History extends Command {
    constructor(){
        super("history", "Displays past commands");
    }

    execute(args: string[]): void {
        const history = HistoryManager.all()
        if (!history.length) {
            throw new CommandError("No command history found");
        }

        const arg = args[0]?.trim()
        if (arg == "--clear" || arg == "-c") {
            HistoryManager.clear()
            utility.displayOutputMessage("Command history cleared");
            return
        }

        const result : string[] = [] 
        history.forEach(entry => {
            const timestamp = new Date(entry.date).toLocaleString();
            result.push(`${timestamp} | ${entry.command}`)
        })

        loopLines(result, 100)
    }
}

export default History