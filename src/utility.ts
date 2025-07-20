import { myterminal, texter, typer } from "./main.js";
import { typetext } from "./animation.js";

import { Command, commandMap } from "./commands/abstract.js";

function displayErrorMessage(msg: string) {
	const errorOutput = document.createElement("p");
	errorOutput.classList.add("error");

	typetext(msg, errorOutput, 1);
	myterminal.append(errorOutput); // Insert before the input line
}

function displayOutputMessage(message: string,  isPreloaded = false, animationDelay: number = 0) {
	const output = document.createElement("p");

	isPreloaded ? output.classList.add("preloaded-msg") : "";
	isPreloaded ? output.classList.add("no-animation") : "";

	typetext(message, output, animationDelay);

	texter.value = "";
	typer.textContent = "";

	myterminal.append(output); // Insert before the input line
}

function findCommandByAlias(alias: string): Command | null {
	alias = alias.toLowerCase();

	const commandName = window.localStorage.getItem(alias);

	if (commandName) {
		const cmd = commandMap.get(commandName.toLowerCase());
		if (cmd && cmd.aliases) {
				cmd.aliases.push(alias);
				return cmd;
		}
	}

	// Search through commandMap for the alias
	for (let [_, value] of commandMap as Map<string, Command>) {
		if (!value || !value.aliases) continue;

		// Return the command object if alias is found in commandMap

		if (value.aliases.includes(alias)) {
			return value;
		} else if (commandName) {
			// if the there's a command who has this alias in the local storage, get it from the commandMap, then add the alias to its list
			// before returning it from the command map.
			
		}
	}

	// Return null if alias not found
	return null;
}

function handleCommand(commandString: string) {
	if (!commandString.trim()) return;

	displayOutputMessage(commandString, true);

	// Split commandString into command and args
	const [command, ...args] = commandString.trim().split(" ");

	// Check if the command exists in commandMap or if it's an alias
	let commandHandler =
		commandMap.get(command.toLowerCase()) ||
		findCommandByAlias(command.toLowerCase());

	// Execute the command if found, otherwise show error message
	if (commandHandler) {
		try {
			commandHandler.execute(args);
		} catch (error) {
			console.error(
				`An error occurred while executing the command "${command}": ${error}`
			);
		}
	} else {
		displayErrorMessage(
			`The command "${command}" is not recognized. Type "help" for a list of available commands.`
		);
	}
}

function register(name: string, command: Command): Command {
	commandMap.set(name, command);
	return command
}

export {displayErrorMessage, displayOutputMessage, handleCommand, register}