import { updateTyper } from "./animation";
import "./register"; 
import handlers from "./handlers";
import dom from "./dom";

dom.texter.addEventListener("input", handlers.handleInput);
dom.texter.addEventListener("keydown", handlers.handleKeyDown);
window.addEventListener("click", handlers.focusTexter);

document.addEventListener("DOMContentLoaded", () => {
	dom.texter.focus();
	updateTyper(dom.texter.value);
});



