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
		return `<span class="command-help">${this.name}</span> ${this.description}`;
	}

	/**
	 * @param args Arguments for the command execution
	 */
	execute(args: string[]): void {
		throw new Error("Method 'execute()' must be implemented.");
	}

}

export {commandMap, Command}
