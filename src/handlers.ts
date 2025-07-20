import { updateTyper } from "./animation";
import dom from "./dom";
import util from "./utility";


function handleInput() {
    dom.typer.textContent = dom.texter.value;
    updateTyper(dom.texter.value);
}

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
		event.preventDefault(); // Prevent default Enter key behavior

		util.handleCommand(dom.texter.value.trim());

		dom.texter.value = ""; // Clear the textarea
		dom.typer.textContent = ""; // Clear the visible command line
		dom.texter.focus(); // Keep focus on texter
	}
}
function focusTexter() {
    dom.texter.focus();
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth", // Optional for smooth scrolling
	});
}

export default {focusTexter, handleInput, handleKeyDown}