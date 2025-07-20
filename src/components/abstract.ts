export class Component {
	container: HTMLDivElement;
	constructor() {
		this.container = document.createElement("div");
	}

	renderIn(targetElement: HTMLElement) {
		targetElement.appendChild(this.container);
	}
}
