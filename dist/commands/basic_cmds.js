"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exit = exports.Clear = exports.Echo = void 0;
const main_js_1 = require("../main.js");
const utility_js_1 = require("../utility.js");
const abstract_js_1 = require("./abstract.js");
class Clear extends abstract_js_1.Command {
    constructor() {
        super("clear", "Clears the terminal screen.");
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            main_js_1.myterminal.textContent = "";
        });
    }
}
exports.Clear = Clear;
class Exit extends abstract_js_1.Command {
    constructor() {
        super("exit", "     Exits the terminal.");
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            window.close();
        });
    }
}
exports.Exit = Exit;
class Echo extends abstract_js_1.Command {
    constructor() {
        super("echo", "     Prints a message in the terminal.");
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = args.join(" ");
            if (!message) {
                (0, utility_js_1.displayErrorMessage)("Please provide a message to print.");
            }
            (0, utility_js_1.displayOutputMessage)(message);
        });
    }
}
exports.Echo = Echo;
