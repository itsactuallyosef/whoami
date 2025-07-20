import { typetext } from "./animation";
import { Command, commandMap } from "./commands/abstract";
import dom from "./dom";

function displayErrorMessage(msg: string) {
	const errorOutput = document.createElement("p");
	errorOutput.classList.add("error");

	typetext(msg, errorOutput, 1);
	dom.terminal.append(errorOutput); // Insert before the input line
}

function displayOutputMessage(message: string,  isPreloaded = false, animationDelay: number = 0) {
	const output = document.createElement("p");

	isPreloaded ? output.classList.add("preloaded-msg") : "";
	isPreloaded ? output.classList.add("no-animation") : "";

	typetext(message, output, animationDelay);

	dom.texter.value = "";
	dom.typer.textContent = "";

	dom.terminal.append(output); // Insert before the input line
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

function handleCommand(commandName: string) {
	if (!commandName.trim()) return;

	displayOutputMessage(commandName, true);

	const [command, ...args] = commandName.trim().split(" ");

	let commandHandler: Command =
		commandMap.get(command.toLowerCase()) ||
		findCommandByAlias(command.toLowerCase());

	if (commandHandler) {
		commandHandler.execute(args);
	} else {
		displayErrorMessage(
			`The command "${command}" is not recognized. Type "help" for a list of available commands.`
		);
	}
}

export default {displayErrorMessage, displayOutputMessage, handleCommand}