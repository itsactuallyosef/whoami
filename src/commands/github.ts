import util from "../utility";
import { Command } from "./abstract";

class Github extends Command {
	constructor() {
		super("github", "Shows my github page on statistics.");
	}

	execute(args: any[]) {
		window.open("https://github.com/itsactuallyosef");
        util.displayOutputMessage("Opening github profile...", false)
	}
}

export default Github