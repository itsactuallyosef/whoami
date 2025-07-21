import dom from "../dom";
import util from "../utility";
import { Command, CommandError } from "./abstract";


class Clear extends Command {
	constructor() {
		super("clear", "Clears the terminal screen.");
	}

	async execute(args: any[]) {
		dom.terminal.textContent = "";
	}
}

class Exit extends Command {
	constructor() {
		super("exit", "Exits the terminal.");
	}

	async execute(args: any[]) {
		window.close();
	}
}

class Echo extends Command {
	constructor() {
		super("echo", "Prints a message in the terminal.");
	}

	async execute(args: any[]) {
		const message = args.join(" ");

		if (!message) {
			throw new CommandError("Please provide a message to print.", );
		}

		util.displayOutputMessage(message);
	}
}

export default {Exit, Echo, Clear}
