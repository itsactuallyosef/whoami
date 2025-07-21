import { loopLines } from "../animation";
import { Command, CommandError } from "./abstract";

class Cowsay extends Command {
	constructor() {
		super("cowsay", "You know what that does.");
	}

	async execute(args: string[]) {
	if (args.length === 0) {
		throw new CommandError("Please provide a message.")
	}

	let figure = "default";
	let message = args.join(" ");

	// check if the first arg is a valid figure
	const knownFigures = ["default", "tux", "dragon", "moose", "elephant",
	"ghostbusters", "kitty", "sodomized", "flaming-sheep"] // list what you know works
	if (knownFigures.includes(args[0])) {
		figure = args[0];
		message = args.slice(1).join(" ");
	}

	const base = figure === "default" ? 
		`https://helloacm.com/api/cowsay/?msg=${encodeURIComponent(message)}` :
		`https://helloacm.com/api/cowsay/?msg=${encodeURIComponent(message)}&f=${figure}`;

	try {
		const res = await fetch(base);
		const raw = await res.text();
		const result = JSON.parse(raw);

		loopLines(result.split("\n"), 90);
	} catch (e) {
		throw new CommandError("Could not fetch cowsay.");
	}
}

}

export default Cowsay