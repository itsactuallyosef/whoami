import { myterminal } from "../main.js";
import { displayOutputMessage, displayErrorMessage } from "../utility.js";
import { Command } from "./abstract.js";

class Clear extends Command {
	constructor() {
		super("clear", "Clears the terminal screen.");
	}

	async execute(args: any[]) {
		myterminal.textContent = "";
	}
}

class Exit extends Command {
	constructor() {
		super("exit", "     Exits the terminal.");
	}

	async execute(args: any[]) {
		window.close();
	}
}

class Echo extends Command {
	constructor() {
		super("echo", "     Prints a message in the terminal.");
	}

	async execute(args: any[]) {
		const message = args.join(" ");

		if (!message) {
			displayErrorMessage("Please provide a message to print.", );
		}

		displayOutputMessage(message);
	}
}

export { Echo, Clear, Exit };