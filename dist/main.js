"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.preloadedCMDS = exports.commandLine = exports.typer = exports.texter = exports.myterminal = void 0;
const animation_js_1 = require("./animation.js");
const utility_js_1 = require("./utility.js");
const Commands = __importStar(require("./commands/abstract.js"));
const myterminal = document.getElementById("terminal");
exports.myterminal = myterminal;
const texter = document.getElementById("texter");
exports.texter = texter;
const typer = document.getElementById("typer");
exports.typer = typer;
const commandLine = document.querySelector(".command");
exports.commandLine = commandLine;
const preloadedCMDS = document.getElementById("preloaded");
exports.preloadedCMDS = preloadedCMDS;
let currentIndex = -1; // Initialize index for cycling through matches
if (!texter || !typer) {
    throw new Error("Texter or Typer element not found. Ensure the HTML structure is correct.");
}
texter.addEventListener("input", () => {
    typer.textContent = texter.value;
    (0, animation_js_1.updateTyper)(texter.value);
});
texter.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default Enter key behavior
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth", // Optional for smooth scrolling
        });
        (0, utility_js_1.handleCommand)(texter.value.trim());
        texter.value = ""; // Clear the textarea
        typer.textContent = ""; // Clear the visible command line
        texter.focus(); // Keep focus on texter
    }
    if (event.key === "Tab") {
        event.preventDefault(); // Prevent default Tab behavior
        // Get the current input text
        const inputText = texter.value; // Use value instead of textContent
        // Find matching command keys
        const matches = [];
        for (let [key, _] of Commands.commandMap.entries()) {
            if (key.startsWith(inputText)) {
                matches.push(key);
            }
        }
        // Cycle through matches
        if (matches.length > 0) {
            currentIndex = (currentIndex + 1) % matches.length; // Increment index
            texter.value = matches[currentIndex]; // Set the value to the current match
            typer.textContent = matches[currentIndex]; // Update the display in your typing area
        }
    }
});
window.addEventListener("click", () => {
    texter.focus();
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // Optional for smooth scrolling
    });
});
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    new Commands.Banner().execute();
    texter.focus();
    (0, animation_js_1.updateTyper)(texter.value);
}));
