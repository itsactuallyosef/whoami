import { loopLines } from "../animation";
import { Command } from "./abstract";
import dom from "../dom";

class WhoIsMe extends Command {
	constructor() {
		super("whoisme", "Who is Yosef?");
	}

	execute(args: string[]) {
		const preElement = document.createElement("pre");
		dom.terminal.appendChild(preElement);
		const aboutme = `There's no 'about me', yet.`;

		loopLines(aboutme.split("\n"), 100);
	}
}

export default WhoIsMe