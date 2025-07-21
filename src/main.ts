import { updateTyper } from "./animation";
import "./register"; 
import handlers from "./handlers";
import dom from "./dom";
import ThemeController from "./util/ThemeController";
import Cowsay from "./commands/cowsay";
import utility from "./utility";

dom.texter.addEventListener("input", handlers.handleInput);
dom.texter.addEventListener("keydown", handlers.handleKeyDown);
window.addEventListener("click", handlers.focusTexter);

document.addEventListener("DOMContentLoaded", () => {
	ThemeController.loadSavedTheme()

	const knownFigures = ["default", "tux", "dragon", "moose", "elephant",
	"ghostbusters", "kitty", "sodomized", "flaming-sheep"];
	const randFigure = knownFigures[Math.floor(Math.random() * knownFigures.length)]
	
	new Cowsay().execute([randFigure, "Hello, World!"]);
	
	dom.texter.focus();
	updateTyper(dom.texter.value);
});



