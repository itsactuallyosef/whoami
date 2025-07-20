import { updateTyper } from "./animation";
import "./register"; 
import handlers from "./handlers";
import dom from "./dom";
import Banner from "./commands/banner";
import ThemeController from "./util/ThemeController";

dom.texter.addEventListener("input", handlers.handleInput);
dom.texter.addEventListener("keydown", handlers.handleKeyDown);
window.addEventListener("click", handlers.focusTexter);

document.addEventListener("DOMContentLoaded", () => {
	ThemeController.loadSavedTheme()
	new Banner().execute([])
	dom.texter.focus();
	updateTyper(dom.texter.value);
});



