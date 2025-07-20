
const terminal = document.getElementById("terminal") as HTMLDivElement;
const texter = document.getElementById("texter") as HTMLInputElement;
const typer = document.getElementById("typer") as HTMLSpanElement;
const commandLine = document.querySelector(".command");
const preloadedCMDS = document.getElementById("preloaded");


if (!texter || !typer) {
	throw new Error("Texter or Typer element not found.");
}

export default {terminal, texter, typer, commandLine, preloadedCMDS}

