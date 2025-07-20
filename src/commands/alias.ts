import { commandMap, Command } from "./abstract";
import util from "../utility";

class Alias extends Command {
	constructor() {
		super("alias", "Creates a shorcut for a command.");
	}

	execute(args: string[]): void{
		if (args.length < 2) {
			util.displayErrorMessage("Please provide both the command and the alias.");
			return;
		}

		if (args.length > 2) {
			util.displayErrorMessage(
				"Too many arguments provided. Please provide only the command and the alias."
			);
			return;
		}

		const [command, alias] = args.map((arg: any) => arg.toLowerCase());

		if (command == alias) {
			util.displayErrorMessage(
				"The alias cannot be the same as the command."
			);
			return;
		}

		// Check if alias already exists
		if (window.localStorage.getItem(alias)) {
			util.displayErrorMessage(
				`The alias "${alias}" already exists. Please choose a different alias.`
			);
			return;
		}

		// Check if command exists
		if (commandMap.has(command)) {
			const commandEntry = commandMap.get(command);

			// if the command does exist, add the alias you wrote to its list of aliases
			console.log(command, commandEntry);

			util.displayOutputMessage(
				`Alias "${alias}" has been successfully created for the command "${command}".`,
				
			);

			// Store the updated aliases in localStorage
			window.localStorage.setItem(alias, command);
		} else {
			util.displayErrorMessage(
				`The command "${command}" does not exist. Cannot create an alias.`
			);
		}
	}
}

export default Alias