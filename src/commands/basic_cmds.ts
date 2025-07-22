import dom from "../dom";
import util from "../utility";
import { Command, CommandError } from "./abstract";


class Clear extends Command {
	constructor() {
		super("clear", "Clears the terminal screen.");
	}

	execute(args: any[]) {
		dom.terminal.textContent = "";
	}
}

class Exit extends Command {
	constructor() {
		super("exit", "Exits the terminal.");
	}

	execute(args: any[]) {
		window.close();
	}
}

class Echo extends Command {
	constructor() {
		super("echo", "Prints a message in the terminal.");
	}

	execute(args: string[]) {
		if (!args.length) {
			throw new CommandError("Please provide a message to print.")
		}
		const message = args.join(" ");

		util.displayOutputMessage(message);
	}
}

export default {Exit, Echo, Clear}
