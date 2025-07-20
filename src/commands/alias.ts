import { commandMap, Command } from "./abstract.js";

import { displayErrorMessage, displayOutputMessage } from "../utility.js";

class Alias extends Command {
	constructor() {
		super("alias", "Creates a shorcut for a command.");
	}

	execute(args: any[]): void{
		if (args.length < 2) {
			displayErrorMessage("Please provide both the command and the alias.");
			return;
		}

		if (args.length > 2) {
			displayErrorMessage(
				"Too many arguments provided. Please provide only the command and the alias."
			);
			return;
		}

		const [command, alias] = args.map((arg: any) => arg.toLowerCase());

		if (command == alias) {
			displayErrorMessage(
				"The alias cannot be the same as the command."
			);
			return;
		}

		// Check if alias already exists
		if (window.localStorage.getItem(alias)) {
			displayErrorMessage(
				`The alias "${alias}" already exists. Please choose a different alias.`
			);
			return;
		}

		// Check if command exists
		if (commandMap.has(command)) {
			const commandEntry = commandMap.get(command);

			// if the command does exist, add the alias you wrote to its list of aliases
			console.log(command, commandEntry);

			displayOutputMessage(
				`Alias "${alias}" has been successfully created for the command "${command}".`,
				
			);

			// Store the updated aliases in localStorage
			window.localStorage.setItem(alias, command);
		} else {
			displayErrorMessage(
				`The command "${command}" does not exist. Cannot create an alias.`
			);
		}
	}
}

export { Alias};