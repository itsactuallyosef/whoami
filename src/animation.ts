import { commandMap } from "./commands/abstract";
import dom from "./dom";

/**
 * the typetext function types out the text in the specified element with a delay.
 * @param {string} text - The text to type out.
 * @param {HTMLElement} element - The HTML element where the text will be typed.
 * @param {number} delay - The delay between each character being typed.
 */
function typetext(text: string, element: HTMLElement, delay = 15) {
	if (!text) return;

	if (element.classList.contains("no-animation")) {
		element.textContent = text;
		return;
	}

	let index = 0;
	const intervalId = setInterval(() => {
		element.textContent += text[index];
		index++;
		if (index === text.length) {
			clearInterval(intervalId);
		}
	}, delay);
}

function addLine(element: HTMLElement, text:string, delay:number) {

	setTimeout(() => {
		let newLine = document.createElement("p");
		newLine.innerHTML = text;

		element.appendChild(newLine);

		window.scrollTo(0, document.body.scrollHeight);
	}, delay);
}

function loopLines(element: HTMLElement, lines: string[], delay: number = 100) {
	lines.forEach((line, index) => {
		addLine(element, line, index * delay);
	});
}

// AUTOCOMPLETE SYSTEM

// This function will execute every time the user make an input event,
// it will check if the commands in the commands Map starts with the input the user entered,
// if so the function will keep updating the "typer" element with the text the user entered and the rest of the matched command.

function updateTyper(command: string) {
	const suggestions: string[] = [];

	commandMap.forEach((key, _) => {
		if (key.name.startsWith(command.toLowerCase())) suggestions.push(key.name);
	});

	if (suggestions.length === 0) return;

	const matchedCommand = command ? suggestions[0] : "";

	const highlightedText = matchedCommand
		? `${command}<span class="suggestion">${matchedCommand.slice(
				command.length
		  )}</span>`
		: "";

	dom.typer.innerHTML = highlightedText;
}

export { typetext, loopLines, updateTyper, addLine };