const commandMap = new Map;

class Command {
	name: string;
	description: string;
	aliases?: string[];

	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
		this.aliases = [];
	}

	__repr__() {
		return `<div class="help-entry"><span class="command-name">${this.name}</span>| <span class="command-description">${this.description}</span></div>`;
	}

	/**
	 * @param args Arguments for the command execution
	 */
	execute(args: string[]): void {
		throw new Error("Method 'execute()' must be implemented.");
	}

}

export {commandMap, Command}
