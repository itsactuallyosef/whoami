"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.handleCommand = exports.displayOutputMessage = exports.displayErrorMessage = void 0;
const main_js_1 = require("./main.js");
const animation_js_1 = require("./animation.js");
const abstract_js_1 = require("./commands/abstract.js");
function displayErrorMessage(msg) {
    const errorOutput = document.createElement("p");
    errorOutput.classList.add("error");
    (0, animation_js_1.typetext)(msg, errorOutput, 1);
    main_js_1.myterminal.append(errorOutput); // Insert before the input line
}
exports.displayErrorMessage = displayErrorMessage;
function displayOutputMessage(message, isPreloaded = false, animationDelay = 0) {
    const output = document.createElement("p");
    isPreloaded ? output.classList.add("preloaded-msg") : "";
    isPreloaded ? output.classList.add("no-animation") : "";
    (0, animation_js_1.typetext)(message, output, animationDelay);
    main_js_1.texter.value = "";
    main_js_1.typer.textContent = "";
    main_js_1.myterminal.append(output); // Insert before the input line
}
exports.displayOutputMessage = displayOutputMessage;
function findCommandByAlias(alias) {
    alias = alias.toLowerCase();
    const commandName = window.localStorage.getItem(alias);
    if (commandName) {
        const cmd = abstract_js_1.commandMap.get(commandName.toLowerCase());
        if (cmd && cmd.aliases) {
            cmd.aliases.push(alias);
            return cmd;
        }
    }
    // Search through commandMap for the alias
    for (let [_, value] of abstract_js_1.commandMap) {
        if (!value || !value.aliases)
            continue;
        // Return the command object if alias is found in commandMap
        if (value.aliases.includes(alias)) {
            return value;
        }
        else if (commandName) {
            // if the there's a command who has this alias in the local storage, get it from the commandMap, then add the alias to its list
            // before returning it from the command map.
        }
    }
    // Return null if alias not found
    return null;
}
function handleCommand(commandString) {
    if (!commandString.trim())
        return;
    displayOutputMessage(commandString, true);
    // Split commandString into command and args
    const [command, ...args] = commandString.trim().split(" ");
    // Check if the command exists in commandMap or if it's an alias
    let commandHandler = abstract_js_1.commandMap.get(command.toLowerCase()) ||
        findCommandByAlias(command.toLowerCase());
    // Execute the command if found, otherwise show error message
    if (commandHandler) {
        try {
            commandHandler.execute(args);
        }
        catch (error) {
            console.error(`An error occurred while executing the command "${command}": ${error}`);
        }
    }
    else {
        displayErrorMessage(`The command "${command}" is not recognized. Type "help" for a list of available commands.`);
    }
}
exports.handleCommand = handleCommand;
function register(name, command) {
    abstract_js_1.commandMap.set(name, command);
    return command;
}
exports.register = register;
