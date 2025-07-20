/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/animation.ts":
/*!**************************!*\
  !*** ./src/animation.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addLine: () => (/* binding */ addLine),\n/* harmony export */   loopLines: () => (/* binding */ loopLines),\n/* harmony export */   typetext: () => (/* binding */ typetext),\n/* harmony export */   updateTyper: () => (/* binding */ updateTyper)\n/* harmony export */ });\n/* harmony import */ var _commands_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n\n\n/**\n * the typetext function types out the text in the specified element with a delay.\n * @param {string} text - The text to type out.\n * @param {HTMLElement} element - The HTML element where the text will be typed.\n * @param {number} delay - The delay between each character being typed.\n */\nfunction typetext(text, element, delay = 15) {\n    if (!text)\n        return;\n    if (element.classList.contains(\"no-animation\")) {\n        element.textContent = text;\n        return;\n    }\n    let index = 0;\n    const intervalId = setInterval(() => {\n        element.textContent += text[index];\n        index++;\n        if (index === text.length) {\n            clearInterval(intervalId);\n        }\n    }, delay);\n}\nfunction addLine(element, text, delay) {\n    setTimeout(() => {\n        let newLine = document.createElement(\"p\");\n        newLine.innerHTML = text;\n        element.appendChild(newLine);\n        window.scrollTo(0, document.body.scrollHeight);\n    }, delay);\n}\nfunction loopLines(lines, delay = 100) {\n    const pre = document.createElement(\"pre\");\n    pre.classList.add(\"animated\");\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].terminal.appendChild(pre);\n    lines.forEach((line, index) => {\n        addLine(pre, line, index * delay);\n    });\n}\n// AUTOCOMPLETE SYSTEM\n// This function will execute every time the user make an input event,\n// it will check if the commands in the commands Map starts with the input the user entered,\n// if so the function will keep updating the \"typer\" element with the text the user entered and the rest of the matched command.\nfunction updateTyper(command) {\n    const suggestions = [];\n    _commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.forEach((key, _) => {\n        if (key.name.startsWith(command.toLowerCase()))\n            suggestions.push(key.name);\n    });\n    if (suggestions.length === 0)\n        return;\n    const matchedCommand = command ? suggestions[0] : \"\";\n    const highlightedText = matchedCommand\n        ? `${command}<span class=\"suggestion\">${matchedCommand.slice(command.length)}</span>`\n        : \"\";\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.innerHTML = highlightedText;\n}\n\n\n\n//# sourceURL=webpack://terfolio/./src/animation.ts?\n}");

/***/ }),

/***/ "./src/commands/abstract.ts":
/*!**********************************!*\
  !*** ./src/commands/abstract.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Command: () => (/* binding */ Command),\n/* harmony export */   commandMap: () => (/* binding */ commandMap)\n/* harmony export */ });\nconst commandMap = new Map;\nclass Command {\n    constructor(name, description) {\n        this.name = name;\n        this.description = description;\n        this.aliases = [];\n    }\n    __repr__() {\n        return `<div class=\"help-entry\"><span class=\"command-name\">${this.name}</span>| <span class=\"command-description\">${this.description}</span></div>`;\n    }\n    /**\n     * @param args Arguments for the command execution\n     */\n    execute(args) {\n        throw new Error(\"Method 'execute()' must be implemented.\");\n    }\n}\n\n\n\n//# sourceURL=webpack://terfolio/./src/commands/abstract.ts?\n}");

/***/ }),

/***/ "./src/commands/alias.ts":
/*!*******************************!*\
  !*** ./src/commands/alias.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n\n\nclass Alias extends _abstract__WEBPACK_IMPORTED_MODULE_0__.Command {\n    constructor() {\n        super(\"alias\", \"Creates a shorcut for a command.\");\n    }\n    execute(args) {\n        if (args.length < 2) {\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayErrorMessage(\"Please provide both the command and the alias.\");\n            return;\n        }\n        if (args.length > 2) {\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayErrorMessage(\"Too many arguments provided. Please provide only the command and the alias.\");\n            return;\n        }\n        const [command, alias] = args.map((arg) => arg.toLowerCase());\n        if (command == alias) {\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayErrorMessage(\"The alias cannot be the same as the command.\");\n            return;\n        }\n        // Check if alias already exists\n        if (window.localStorage.getItem(alias)) {\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayErrorMessage(`The alias \"${alias}\" already exists. Please choose a different alias.`);\n            return;\n        }\n        // Check if command exists\n        if (_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.has(command)) {\n            const commandEntry = _abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.get(command);\n            // if the command does exist, add the alias you wrote to its list of aliases\n            console.log(command, commandEntry);\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayOutputMessage(`Alias \"${alias}\" has been successfully created for the command \"${command}\".`);\n            // Store the updated aliases in localStorage\n            window.localStorage.setItem(alias, command);\n        }\n        else {\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayErrorMessage(`The command \"${command}\" does not exist. Cannot create an alias.`);\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alias);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/alias.ts?\n}");

/***/ }),

/***/ "./src/commands/banner.ts":
/*!********************************!*\
  !*** ./src/commands/banner.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom */ \"./src/dom.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\n\nclass Banner extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"banner\", \"Displays an ASCII banner.\");\n    }\n    execute(args) {\n        const preElement = document.createElement(\"pre\");\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].terminal.appendChild(preElement);\n        const ascii = `\r\n   __   __  _______  _______  _______  _______  __   _______    _______  _______  ______    __   __  ___   __    _  _______  ___     \t \r\n  |  | |  ||       ||       ||       ||       ||  | |       |  |       ||       ||    _ |  |  |_|  ||   | |  |  | ||   _   ||   |   \t\t \r\n  |  |_|  ||   _   ||  _____||    ___||    ___||__| |  _____|  |_     _||    ___||   | ||  |       ||   | |   |_| ||  |_|  ||   |    \t    \r\n  |       ||  | |  || |_____ |   |___ |   |___      | |_____     |   |  |   |___ |   |_||_ |       ||   | |       ||       ||   |    \t    \r\n  |_     _||  |_|  ||_____  ||    ___||    ___|     |_____  |    |   |  |    ___||    __  ||       ||   | |  _    ||       ||   |___  ___ \r\n    |   |  |       | _____| ||   |___ |   |          _____| |    |   |  |   |___ |   |  | || ||_|| ||   | | | |   ||   _   ||       ||   |\r\n    |___|  |_______||_______||_______||___|         |_______|    |___|  |_______||___|  |_||_|   |_||___| |_|  |__||__| |__||_______||___|\r\n  \r\n    \r\n  Welcome to my Interactive web-terminal :D\r\n  For a list of available commands, type <span style=\"margin:0;\" class=\"command-help\">'help'</span>.`;\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(ascii.split(\"\\n\"), 90);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Banner);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/banner.ts?\n}");

/***/ }),

/***/ "./src/commands/basic_cmds.ts":
/*!************************************!*\
  !*** ./src/commands/basic_cmds.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ \"./src/dom.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\n\nclass Clear extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"clear\", \"Clears the terminal screen.\");\n    }\n    async execute(args) {\n        _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].terminal.textContent = \"\";\n    }\n}\nclass Exit extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"exit\", \"Exits the terminal.\");\n    }\n    async execute(args) {\n        window.close();\n    }\n}\nclass Echo extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"echo\", \"Prints a message in the terminal.\");\n    }\n    async execute(args) {\n        const message = args.join(\" \");\n        if (!message) {\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayErrorMessage(\"Please provide a message to print.\");\n        }\n        _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayOutputMessage(message);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Exit, Echo, Clear });\n\n\n//# sourceURL=webpack://terfolio/./src/commands/basic_cmds.ts?\n}");

/***/ }),

/***/ "./src/commands/github.ts":
/*!********************************!*\
  !*** ./src/commands/github.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\nclass Github extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"github\", \"Shows my github page on statistics.\");\n    }\n    execute(args) {\n        window.open(\"https://github.com/itsactuallyosef\");\n        _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(\"Opening github profile...\", false);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Github);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/github.ts?\n}");

/***/ }),

/***/ "./src/commands/help.ts":
/*!******************************!*\
  !*** ./src/commands/help.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n // Correct import statement\nclass Help extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"help\", \"Displays all available commands.\");\n    }\n    // Implement the execute method\n    execute(args) {\n        // // Example: Display available commands\n        let lines = [\"<br/>\"];\n        if (args.length) {\n            // Get the description of a specific command.\n            const command = _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(args[0]);\n            if (command) {\n                lines.push(command.__repr__());\n            }\n            else {\n                lines.push(`The command \"${args[0]}\" is not recognized.`);\n            }\n            lines.push(\"<br/>\");\n            (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(lines, 50);\n            return;\n        }\n        for (let [_, val] of _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.entries()) {\n            lines.push(val.__repr__());\n        }\n        lines.push(\"<br/>\");\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(lines, 50);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Help);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/help.ts?\n}");

/***/ }),

/***/ "./src/commands/social.ts":
/*!********************************!*\
  !*** ./src/commands/social.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\nclass Social extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"social\", \"Lists all my social networks.\");\n    }\n    async execute(args) {\n        const social = [\n            \"</br>\",\n            \"<p style='margin-left:20px;'>Linkedin      <a class='social-link' target='_blank' href='https://www.linkedin.com/in/yosef-mohamed-9563a22aa'>linkedin/YosefMohamed/</a></p>\",\n            \"<p style='margin-left:20px;'>Github        <a class='social-link' target='_blank' href='https://github.com/theyosefegy'>github/theyosefegy/</a></p>\",\n            \"<p style='margin-left:20px;'>Instagram     <a class='social-link' target='_blank' href='https://www.instagram.com/theyosefegy/'>instagram/theyosefegy/</a></p>\",\n            \"<p style='margin-left:20px;'>Facebook      <a class='social-link' target='_blank' href='https://www.facebook.com/yosef.mohammed.750546'>facebook/YosefMohamed/</a></p>\",\n            \"</br>\",\n        ];\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(social, 50);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Social);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/social.ts?\n}");

/***/ }),

/***/ "./src/commands/unalias.ts":
/*!*********************************!*\
  !*** ./src/commands/unalias.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\nclass Unalias extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"unalias\", \"Removes either all commands or for a specific one.\");\n    }\n    execute(args) {\n        const arg = args[0].toLowerCase();\n        if (!arg) {\n            _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayErrorMessage(\"Please enter either 'all' or a specific command.\");\n            return;\n        }\n        switch (arg) {\n            case \"all\":\n                window.localStorage.clear();\n                for (let [_, val] of _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap) {\n                    val.aliases = [];\n                }\n                _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(\"Cleared aliases for all commands!\");\n            default:\n                const command = _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(arg);\n                if (!command) {\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayErrorMessage(`The command \"${arg}\" is not recognized.`);\n                    return;\n                }\n                if (command.aliases.length === 0 && !localStorage.getItem(arg)) {\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayErrorMessage(`No aliases found for \"${arg}\".`);\n                    return;\n                }\n                if (command.aliases.length > 0) {\n                    command.aliases = [];\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(`Successfully removed all aliases for \"${arg}\".`);\n                }\n                else {\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(`No aliases found for \"${arg}\".`);\n                }\n                // Remove from localStorage if it exists\n                if (localStorage.getItem(arg)) {\n                    localStorage.removeItem(arg);\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(`Removed \"${arg}\" from localStorage.`);\n                }\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unalias);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/unalias.ts?\n}");

/***/ }),

/***/ "./src/commands/whoisme.ts":
/*!*********************************!*\
  !*** ./src/commands/whoisme.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom */ \"./src/dom.ts\");\n\n\n\nclass WhoIsMe extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"whoisme\", \"Who is Yosef?\");\n    }\n    execute(args) {\n        const preElement = document.createElement(\"pre\");\n        _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].terminal.appendChild(preElement);\n        const aboutme = `\r\n\t\t\t-\r\n\t\t\tHey, I'm Yosef!👋  \r\n\t\t\tI’m a software engineer dedicated to building engaging, high-quality websites like this one.\r\n\t\t\tMy journey in tech began in 2023 when I started studying Computer Science.\r\n\t\t\tWhile diving into my college studies, I found myself learning even more outside the classroom,\r\n\t\t\tdriven by the goal of landing a rewarding role in this field.\r\n\r\n\t\t\t-\r\n\r\n\t\t\tLearning has become more than a habit; it’s a passion. I’m hungry for information and constantly pushing myself to improve.\r\n\t\t\tI wanted to learn *everything*—Machine Learning, DevOps, and not just the tech world.\r\n\t\t\tI wanted to explore roles lwwike HR and Product Management to truly understand all sides of building impactful projects.Over time, \r\n\t\t\tI’ve worked on a wide range of projects, both for fun and for practice,\r\n\t\t\tand I've enjoyed helping my peers navigate the vast world of software engineering and computer science. \r\n\r\n\t\t\t-\r\n\r\n\t\t\tWhat started as a personal journey became an online presence that’s connected me with a world of knowledge and innovation.\r\n\t\t\tMy goal? To keep learning, keep growing, and maybe even make a significant impact on humanity along the way.\r\n\t\t\tI’m excited to see where this journey takes me next—and what I can create as I strive to become the best version of myself.\r\n\t\t\t-\r\n`;\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(aboutme.split(\"\\n\"), 100);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WhoIsMe);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/whoisme.ts?\n}");

/***/ }),

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst terminal = document.getElementById(\"terminal\");\nconst texter = document.getElementById(\"texter\");\nconst typer = document.getElementById(\"typer\");\nconst commandLine = document.querySelector(\".command\");\nconst preloadedCMDS = document.getElementById(\"preloaded\");\nif (!texter || !typer) {\n    throw new Error(\"Texter or Typer element not found.\");\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ terminal, texter, typer, commandLine, preloadedCMDS });\n\n\n//# sourceURL=webpack://terfolio/./src/dom.ts?\n}");

/***/ }),

/***/ "./src/handlers.ts":
/*!*************************!*\
  !*** ./src/handlers.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./src/animation.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility */ \"./src/utility.ts\");\n\n\n\nfunction handleInput() {\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.textContent = _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value;\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.updateTyper)(_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value);\n}\nfunction handleKeyDown(event) {\n    if (event.key === \"Enter\") {\n        event.preventDefault(); // Prevent default Enter key behavior\n        _utility__WEBPACK_IMPORTED_MODULE_2__[\"default\"].handleCommand(_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value.trim());\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value = \"\"; // Clear the textarea\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.textContent = \"\"; // Clear the visible command line\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.focus(); // Keep focus on texter\n    }\n}\nfunction focusTexter() {\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.focus();\n    window.scrollTo({\n        top: document.body.scrollHeight,\n        behavior: \"smooth\", // Optional for smooth scrolling\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ focusTexter, handleInput, handleKeyDown });\n\n\n//# sourceURL=webpack://terfolio/./src/handlers.ts?\n}");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./src/animation.ts\");\n/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register */ \"./src/register.ts\");\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n\n\n\n\n_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.addEventListener(\"input\", _handlers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].handleInput);\n_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.addEventListener(\"keydown\", _handlers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].handleKeyDown);\nwindow.addEventListener(\"click\", _handlers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].focusTexter);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.focus();\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.updateTyper)(_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.value);\n});\n\n\n//# sourceURL=webpack://terfolio/./src/main.ts?\n}");

/***/ }),

/***/ "./src/register.ts":
/*!*************************!*\
  !*** ./src/register.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _commands_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _commands_alias__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/alias */ \"./src/commands/alias.ts\");\n/* harmony import */ var _commands_banner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commands/banner */ \"./src/commands/banner.ts\");\n/* harmony import */ var _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commands/basic_cmds */ \"./src/commands/basic_cmds.ts\");\n/* harmony import */ var _commands_github__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commands/github */ \"./src/commands/github.ts\");\n/* harmony import */ var _commands_help__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commands/help */ \"./src/commands/help.ts\");\n/* harmony import */ var _commands_social__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./commands/social */ \"./src/commands/social.ts\");\n/* harmony import */ var _commands_unalias__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./commands/unalias */ \"./src/commands/unalias.ts\");\n/* harmony import */ var _commands_whoisme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./commands/whoisme */ \"./src/commands/whoisme.ts\");\n\n\n\n\n\n\n\n\n\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"help\", new _commands_help__WEBPACK_IMPORTED_MODULE_5__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"github\", new _commands_github__WEBPACK_IMPORTED_MODULE_4__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"whoisme\", new _commands_whoisme__WEBPACK_IMPORTED_MODULE_8__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"social\", new _commands_social__WEBPACK_IMPORTED_MODULE_6__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"clear\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Clear());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"banner\", new _commands_banner__WEBPACK_IMPORTED_MODULE_2__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"alias\", new _commands_alias__WEBPACK_IMPORTED_MODULE_1__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"unalias\", new _commands_unalias__WEBPACK_IMPORTED_MODULE_7__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"clear\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Clear());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"echo\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Echo());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"exit\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Exit());\n\n\n//# sourceURL=webpack://terfolio/./src/register.ts?\n}");

/***/ }),

/***/ "./src/utility.ts":
/*!************************!*\
  !*** ./src/utility.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./src/animation.ts\");\n/* harmony import */ var _commands_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n\n\n\nfunction displayErrorMessage(msg) {\n    const errorOutput = document.createElement(\"p\");\n    errorOutput.classList.add(\"error\");\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.typetext)(msg, errorOutput, 1);\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].terminal.append(errorOutput); // Insert before the input line\n}\nfunction displayOutputMessage(message, isPreloaded = false, animationDelay = 0) {\n    const output = document.createElement(\"p\");\n    isPreloaded ? output.classList.add(\"preloaded-msg\") : \"\";\n    isPreloaded ? output.classList.add(\"no-animation\") : \"\";\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.typetext)(message, output, animationDelay);\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].texter.value = \"\";\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].typer.textContent = \"\";\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].terminal.append(output); // Insert before the input line\n}\nfunction findCommandByAlias(alias) {\n    alias = alias.toLowerCase();\n    const commandName = window.localStorage.getItem(alias);\n    if (commandName) {\n        const cmd = _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(commandName.toLowerCase());\n        if (cmd && cmd.aliases) {\n            cmd.aliases.push(alias);\n            return cmd;\n        }\n    }\n    // Search through commandMap for the alias\n    for (let [_, value] of _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap) {\n        if (!value || !value.aliases)\n            continue;\n        // Return the command object if alias is found in commandMap\n        if (value.aliases.includes(alias)) {\n            return value;\n        }\n        else if (commandName) {\n            // if the there's a command who has this alias in the local storage, get it from the commandMap, then add the alias to its list\n            // before returning it from the command map.\n        }\n    }\n    // Return null if alias not found\n    return null;\n}\nfunction handleCommand(commandName) {\n    if (!commandName.trim())\n        return;\n    displayOutputMessage(commandName, true);\n    const [command, ...args] = commandName.trim().split(\" \");\n    let commandHandler = _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(command.toLowerCase()) ||\n        findCommandByAlias(command.toLowerCase());\n    if (commandHandler) {\n        commandHandler.execute(args);\n    }\n    else {\n        displayErrorMessage(`The command \"${command}\" is not recognized. Type \"help\" for a list of available commands.`);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ displayErrorMessage, displayOutputMessage, handleCommand });\n\n\n//# sourceURL=webpack://terfolio/./src/utility.ts?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;