import { loopLines } from "../animation";
import dom from "../dom";
import { Command } from "./abstract";

class Banner extends Command {
	constructor() {
		super("banner", "Displays an ASCII banner.");
	}

	execute(args: string[]) {
		const preElement = document.createElement("pre");
		dom.terminal.appendChild(preElement);
		const ascii = `
'
   __   __  _______  _______  _______  _______  __   _______    _______  _______  ______    __   __  ___   __    _  _______  ___     	 
  |  | |  ||       ||       ||       ||       ||  | |       |  |       ||       ||    _ |  |  |_|  ||   | |  |  | ||   _   ||   |   		 
  |  |_|  ||   _   ||  _____||    ___||    ___||__| |  _____|  |_     _||    ___||   | ||  |       ||   | |   |_| ||  |_|  ||   |    	    
  |       ||  | |  || |_____ |   |___ |   |___      | |_____     |   |  |   |___ |   |_||_ |       ||   | |       ||       ||   |    	    
  |_     _||  |_|  ||_____  ||    ___||    ___|     |_____  |    |   |  |    ___||    __  ||       ||   | |  _    ||       ||   |___  ___ 
    |   |  |       | _____| ||   |___ |   |          _____| |    |   |  |   |___ |   |  | || ||_|| ||   | | | |   ||   _   ||       ||   |
    |___|  |_______||_______||_______||___|         |_______|    |___|  |_______||___|  |_||_|   |_||___| |_|  |__||__| |__||_______||___|
  
  Welcome to my Interactive web-terminal :D
  For a list of available commands, type <span style="margin:0;" class="command-help">'help'</span>.
`;

		loopLines(preElement, ascii.replace(" ", "&nbsp;&nbsp;").split("\n"), 90);
	}
}


export default Banner