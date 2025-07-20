"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unalias = void 0;
const utility_js_1 = require("../utility.js");
const abstract_js_1 = require("./abstract.js");
class Unalias extends abstract_js_1.Command {
    constructor() {
        super("unalias", "  Removes either all commands or for a specific one.");
    }
    execute(args) {
        const arg = args[0].toLowerCase();
        if (!arg) {
            (0, utility_js_1.displayErrorMessage)("Please enter either 'all' or a specific command.");
            return;
        }
        switch (arg) {
            case "all":
                window.localStorage.clear();
                for (let [_, val] of abstract_js_1.commandMap) {
                    val.aliases = [];
                }
                (0, utility_js_1.displayOutputMessage)("Cleared aliases for all commands!");
            default:
                const command = abstract_js_1.commandMap.get(arg);
                if (!command) {
                    (0, utility_js_1.displayErrorMessage)(`The command "${arg}" is not recognized.`);
                    return;
                }
                if (command.aliases.length === 0 && !localStorage.getItem(arg)) {
                    (0, utility_js_1.displayErrorMessage)(`No aliases found for "${arg}".`);
                    return;
                }
                if (command.aliases.length > 0) {
                    command.aliases = [];
                    (0, utility_js_1.displayOutputMessage)(`Successfully removed all aliases for "${arg}".`);
                }
                else {
                    (0, utility_js_1.displayOutputMessage)(`No aliases found for "${arg}".`);
                }
                // Remove from localStorage if it exists
                if (localStorage.getItem(arg)) {
                    localStorage.removeItem(arg);
                    (0, utility_js_1.displayOutputMessage)(`Removed "${arg}" from localStorage.`);
                }
        }
    }
}
exports.Unalias = Unalias;
