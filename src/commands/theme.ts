
import { Command } from "./abstract";
import utility from "../utility";
import ThemeController, { themes } from "../util/ThemeController";
import { loopLines } from "../animation";

class Theme extends Command {
	constructor() {
		super("theme", "Change terminal theme.");
	}

	execute(args: string[]) {
	const arg = args[0]

	if (!arg ||arg === "--list") {
		const lines = Object.keys(themes)
		loopLines(lines, 100)
		return
	}

	if (!(arg in themes)) {
		utility.displayErrorMessage(`Theme "${arg}" not found. Try '--list' to see available themes.`)
		return
	}

	ThemeController.applyTheme(arg)
	utility.displayOutputMessage(`Switched to theme: ${arg}`)
}
}

export default Theme;
