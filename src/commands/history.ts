import { loopLines } from "../animation";
import HistoryManager from "../util/HistoryManager";
import { Command, CommandError } from "./abstract";

class History extends Command {
    constructor(){
        super("history", "Displays past commands");
    }

    execute(args: string[]): void {
        const commands = HistoryManager.all()
        if (!commands.length) {
            throw new CommandError("No command history found");
        }

        loopLines(commands, 100);
    }
}

export default History