import { updateTyper } from "./animation";
import dom from "./dom";
import HistoryManager from "./util/HistoryManager";
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
	if (event.key === "ArrowUp") {
		const val = HistoryManager.previous();
		dom.texter.value = val
		dom.typer.textContent = val
	}
	if (event.key === "ArrowDown") {
		const val = HistoryManager.next();
		dom.texter.value = val
		dom.typer.textContent = val
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

// history array
// event handling:
//		KEY DOWN: decrease index
//		KEY UP  : increase index
// Handle "out of reach" error for the array.
