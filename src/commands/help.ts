import { loopLines } from "../animation";
import { Command, commandMap } from "./abstract"; // Correct import statement

class Help extends Command {
	constructor() {
		super("help", "Displays all available commands.");
	}

	execute(args: string[]) {
		let lines = ["<br/>"];

		if (args.length) {
			// Get the description of a specific command.
			const command = commandMap.get(args[0]);
			if (command) {
				lines.push(command.__repr__());
			} else {
				lines.push(`The command "${args[0]}" is not recognized.`);
			}
			lines.push("<br/>");
			loopLines(lines, 50);

			return;
		}

		for (let [_, val] of commandMap.entries()) {
			lines.push(val.__repr__());
		}

		lines.push("<br/>");
		loopLines(lines, 50);
	}
}

export default Help