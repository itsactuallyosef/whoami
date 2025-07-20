"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alias = void 0;
const abstract_js_1 = require("./abstract.js");
const utility_js_1 = require("../utility.js");
class Alias extends abstract_js_1.Command {
    constructor() {
        super("alias", "Creates a shorcut for a command.");
    }
    execute(args) {
        if (args.length < 2) {
            (0, utility_js_1.displayErrorMessage)("Please provide both the command and the alias.");
            return;
        }
        if (args.length > 2) {
            (0, utility_js_1.displayErrorMessage)("Too many arguments provided. Please provide only the command and the alias.");
            return;
        }
        const [command, alias] = args.map((arg) => arg.toLowerCase());
        if (command == alias) {
            (0, utility_js_1.displayErrorMessage)("The alias cannot be the same as the command.");
            return;
        }
        // Check if alias already exists
        if (window.localStorage.getItem(alias)) {
            (0, utility_js_1.displayErrorMessage)(`The alias "${alias}" already exists. Please choose a different alias.`);
            return;
        }
        // Check if command exists
        if (abstract_js_1.commandMap.has(command)) {
            const commandEntry = abstract_js_1.commandMap.get(command);
            // if the command does exist, add the alias you wrote to its list of aliases
            console.log(command, commandEntry);
            (0, utility_js_1.displayOutputMessage)(`Alias "${alias}" has been successfully created for the command "${command}".`);
            // Store the updated aliases in localStorage
            window.localStorage.setItem(alias, command);
        }
        else {
            (0, utility_js_1.displayErrorMessage)(`The command "${command}" does not exist. Cannot create an alias.`);
        }
    }
}
exports.Alias = Alias;
