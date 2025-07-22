import { updateTyper } from "./animation";
import "./register"; 
import handlers from "./handlers";
import dom from "./dom";
import ThemeController from "./util/ThemeController";
import Cowsay from "./commands/cowsay";
import HistoryManager from "./util/HistoryManager";

dom.texter.addEventListener("input", handlers.handleInput);

dom.texter.addEventListener("keydown", handlers.handleKeyDown);

window.addEventListener("click", handlers.focusTexter);

document.addEventListener("DOMContentLoaded", () => {
	ThemeController.loadSavedTheme()
	HistoryManager.loadSavedHistory()

	const knownFigures = ["default", "tux", "dragon", "moose", "elephant",
	"ghostbusters", "kitty", "sodomized", "flaming-sheep"];
	const randFigure = knownFigures[Math.floor(Math.random() * knownFigures.length)]
	
	new Cowsay().execute([randFigure, "Hello, World!"]);
	
	dom.texter.focus();
	updateTyper(dom.texter.value);
});



