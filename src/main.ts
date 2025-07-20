import { updateTyper } from "./animation.js";
import { handleCommand } from "./utility.js";
import * as Commands from "./commands/abstract.js";

const myterminal = document.getElementById("terminal") as HTMLDivElement;
const texter = document.getElementById("texter") as HTMLInputElement;
const typer = document.getElementById("typer") as HTMLSpanElement;
const commandLine = document.querySelector(".command");
const preloadedCMDS = document.getElementById("preloaded");

let currentIndex = -1; // Initialize index for cycling through matches

if (!texter || !typer) {
	throw new Error("Texter or Typer element not found. Ensure the HTML structure is correct.");
}

texter.addEventListener("input", () => {
	typer.textContent = texter.value;
	updateTyper(texter.value);
});

texter.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault(); // Prevent default Enter key behavior

		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth", // Optional for smooth scrolling
		});

		handleCommand(texter.value.trim());

		texter.value = ""; // Clear the textarea
		typer.textContent = ""; // Clear the visible command line
		texter.focus(); // Keep focus on texter
	}
	if (event.key === "Tab") {
		event.preventDefault(); // Prevent default Tab behavior

		// Get the current input text
		const inputText = texter.value; // Use value instead of textContent

		// Find matching command keys
		const matches = [];
		for (let [key, _] of Commands.commandMap.entries()) {
			if (key.startsWith(inputText)) {
				matches.push(key);
			}
		}

		// Cycle through matches
		if (matches.length > 0) {
			currentIndex = (currentIndex + 1) % matches.length; // Increment index
			texter.value = matches[currentIndex]; // Set the value to the current match
			typer.textContent = matches[currentIndex]; // Update the display in your typing area
		}
	}
});

window.addEventListener("click", () => {
	texter.focus();
	window.scrollTo({
		top: document.body.scrollHeight,
		behavior: "smooth", // Optional for smooth scrolling
	});
});

document.addEventListener("DOMContentLoaded", async () => {
	new Commands.Banner().execute();
	texter.focus();
	updateTyper(texter.value);
});

export { myterminal, texter, typer, commandLine, preloadedCMDS}