import { displayErrorMessage, displayOutputMessage } from "../utility.js";
import { Command, commandMap } from "./abstract.js";

class Unalias extends Command {
	constructor() {
		super("unalias", "  Removes either all commands or for a specific one.");
	}

	execute(args: any[]) {
		const arg = args[0].toLowerCase();

		if (!arg) {
			displayErrorMessage("Please enter either 'all' or a specific command.");
			return;
		}

		switch (arg) {
			case "all":
				window.localStorage.clear();

				for (let [_, val] of commandMap) {
					val.aliases = [];
				}

				displayOutputMessage("Cleared aliases for all commands!");
			default:
				const command = commandMap.get(arg);
				if (!command) {
					displayErrorMessage(`The command "${arg}" is not recognized.`);
					return;
				}
				
				if (command.aliases.length === 0 && !localStorage.getItem(arg)) {
					displayErrorMessage(`No aliases found for "${arg}".`);
					return;
				}

				if (command.aliases.length > 0) {
					command.aliases = [];
					displayOutputMessage(`Successfully removed all aliases for "${arg}".`);
				} else {
					displayOutputMessage(`No aliases found for "${arg}".`);
				}

				// Remove from localStorage if it exists
				if (localStorage.getItem(arg)) {
					localStorage.removeItem(arg);
					displayOutputMessage(`Removed "${arg}" from localStorage.`);
				}
		}
	}
}

export { Unalias };