import util from "../utility";
import { Command, CommandError, commandMap } from "./abstract";


class Unalias extends Command {
	constructor() {
		super("unalias", "Removes either all commands or for a specific one.");
	}

	execute(args: any[]) {
		if (!args.length) {
			throw new CommandError("missing alias name. Usage: unalias <name>")
		}

		const arg = args[0].toLowerCase();

		if (!arg) {
			throw new CommandError("Please enter either 'all' or a specific command.");
		}

		switch (arg) {
			case "all":
				window.localStorage.clear();

				for (let [_, val] of commandMap) {
					val.aliases = [];
				}

				util.displayOutputMessage("Cleared aliases for all commands!");
			default:
				const command = commandMap.get(arg);
				if (!command) {
					throw new CommandError(`The command "${arg}" is not recognized.`);
				}
				
				if (command.aliases.length === 0 && !localStorage.getItem(arg)) {
					throw new CommandError(`No aliases found for "${arg}".`);
				}

				if (command.aliases.length > 0) {
					command.aliases = [];
					util.displayOutputMessage(`Successfully removed all aliases for "${arg}".`);
				} else {
					util.displayOutputMessage(`No aliases found for "${arg}".`);
				}

				// Remove from localStorage if it exists
				if (localStorage.getItem(arg)) {
					localStorage.removeItem(arg);
					util.displayOutputMessage(`Removed "${arg}" from localStorage.`);
				}
		}
	}
}

export default Unalias