import util from "../utility";
import { Command, commandMap } from "./abstract";


class Unalias extends Command {
	constructor() {
		super("unalias", "Removes either all commands or for a specific one.");
	}

	execute(args: any[]) {
		const arg = args[0].toLowerCase();

		if (!arg) {
			util.displayErrorMessage("Please enter either 'all' or a specific command.");
			return;
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
					util.displayErrorMessage(`The command "${arg}" is not recognized.`);
					return;
				}
				
				if (command.aliases.length === 0 && !localStorage.getItem(arg)) {
					util.displayErrorMessage(`No aliases found for "${arg}".`);
					return;
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