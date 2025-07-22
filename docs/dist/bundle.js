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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Command: () => (/* binding */ Command),\n/* harmony export */   CommandError: () => (/* binding */ CommandError),\n/* harmony export */   commandMap: () => (/* binding */ commandMap)\n/* harmony export */ });\nconst commandMap = new Map;\nclass CommandError extends Error {\n    constructor(message) {\n        super(message);\n        this.name = \"CommandError\";\n    }\n}\nclass Command {\n    constructor(name, description) {\n        this.name = name;\n        this.description = description;\n        this.aliases = [];\n    }\n    __repr__() {\n        return `<div class=\"help-entry\"><span class=\"command-name\">${this.name}</span>| <span class=\"command-description\">${this.description}</span></div>`;\n    }\n    /**\n     * @param args Arguments for the command execution\n     */\n    execute(args) {\n        throw new Error(\"Method 'execute()' must be implemented.\");\n    }\n}\n\n\n\n//# sourceURL=webpack://terfolio/./src/commands/abstract.ts?\n}");

/***/ }),

/***/ "./src/commands/alias.ts":
/*!*******************************!*\
  !*** ./src/commands/alias.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n\n\nclass Alias extends _abstract__WEBPACK_IMPORTED_MODULE_0__.Command {\n    constructor() {\n        super(\"alias\", \"Creates a shorcut for a command.\");\n    }\n    execute(args) {\n        if (args.length < 2) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(\"Please provide both the command and the alias.\");\n        }\n        if (args.length > 2) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(\"Too many arguments provided. Please provide only the command and the alias.\");\n        }\n        const [command, alias] = args.map((arg) => arg.toLowerCase());\n        if (command == alias) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(\"The alias cannot be the same as the command.\");\n        }\n        // Check if alias already exists\n        if (window.localStorage.getItem(alias)) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(`The alias \"${alias}\" already exists. Please choose a different alias.`);\n        }\n        // Check if command exists\n        if (_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.has(command)) {\n            const commandEntry = _abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.get(command);\n            // if the command does exist, add the alias you wrote to its list of aliases\n            console.log(command, commandEntry);\n            _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayOutputMessage(`Alias \"${alias}\" has been successfully created for the command \"${command}\".`);\n            // Store the updated aliases in localStorage\n            window.localStorage.setItem(alias, command);\n        }\n        else {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(`The command \"${command}\" does not exist. Cannot create an alias.`);\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alias);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/alias.ts?\n}");

/***/ }),

/***/ "./src/commands/basic_cmds.ts":
/*!************************************!*\
  !*** ./src/commands/basic_cmds.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom */ \"./src/dom.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\n\nclass Clear extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"clear\", \"Clears the terminal screen.\");\n    }\n    execute(args) {\n        _dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].terminal.textContent = \"\";\n    }\n}\nclass Exit extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"exit\", \"Exits the terminal.\");\n    }\n    execute(args) {\n        window.close();\n    }\n}\nclass Echo extends _abstract__WEBPACK_IMPORTED_MODULE_2__.Command {\n    constructor() {\n        super(\"echo\", \"Prints a message in the terminal.\");\n    }\n    execute(args) {\n        if (!args.length) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_2__.CommandError(\"Please provide a message to print.\");\n        }\n        const message = args.join(\" \");\n        _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayOutputMessage(message);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Exit, Echo, Clear });\n\n\n//# sourceURL=webpack://terfolio/./src/commands/basic_cmds.ts?\n}");

/***/ }),

/***/ "./src/commands/cowsay.ts":
/*!********************************!*\
  !*** ./src/commands/cowsay.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\nclass Cowsay extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"cowsay\", \"You know what that does.\");\n    }\n    async execute(args) {\n        if (args.length === 0) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(\"Please provide a message.\");\n        }\n        let figure = \"default\";\n        let message = args.join(\" \");\n        // check if the first arg is a valid figure\n        const knownFigures = [\"default\", \"tux\", \"dragon\", \"moose\", \"elephant\",\n            \"ghostbusters\", \"kitty\", \"sodomized\", \"flaming-sheep\"]; // list what you know works\n        if (knownFigures.includes(args[0])) {\n            figure = args[0];\n            message = args.slice(1).join(\" \");\n        }\n        const base = figure === \"default\" ?\n            `https://helloacm.com/api/cowsay/?msg=${encodeURIComponent(message)}` :\n            `https://helloacm.com/api/cowsay/?msg=${encodeURIComponent(message)}&f=${figure}`;\n        try {\n            const res = await fetch(base);\n            const raw = await res.text();\n            const result = JSON.parse(raw);\n            (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(result.split(\"\\n\"), 90);\n        }\n        catch (e) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(\"Could not fetch cowsay.\");\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cowsay);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/cowsay.ts?\n}");

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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n // Correct import statement\nclass Help extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"help\", \"Displays all available commands.\");\n    }\n    execute(args) {\n        let lines = [\"<br/>\"];\n        if (args.length) {\n            // Get the description of a specific command.\n            const command = _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(args[0]);\n            if (command) {\n                lines.push(command.__repr__());\n            }\n            else {\n                lines.push(`The command \"${args[0]}\" is not recognized.`);\n            }\n            lines.push(\"<br/>\");\n            (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(lines, 50);\n            return;\n        }\n        for (let [_, val] of _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.entries()) {\n            lines.push(val.__repr__());\n        }\n        lines.push(\"<br/>\");\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(lines, 50);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Help);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/help.ts?\n}");

/***/ }),

/***/ "./src/commands/history.ts":
/*!*********************************!*\
  !*** ./src/commands/history.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _util_HistoryManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/HistoryManager */ \"./src/util/HistoryManager.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\n\n\nclass History extends _abstract__WEBPACK_IMPORTED_MODULE_3__.Command {\n    constructor() {\n        super(\"history\", \"Displays past commands\");\n    }\n    execute(args) {\n        const history = _util_HistoryManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"].all();\n        if (!history.length) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_3__.CommandError(\"No command history found\");\n        }\n        const arg = args[0]?.trim();\n        if (arg == \"--clear\" || arg == \"-c\") {\n            _util_HistoryManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"].clear();\n            _utility__WEBPACK_IMPORTED_MODULE_2__[\"default\"].displayOutputMessage(\"Command history cleared\");\n            return;\n        }\n        const result = [];\n        history.forEach(entry => {\n            const timestamp = new Date(entry.date).toLocaleString();\n            result.push(`${timestamp} | ${entry.command}`);\n        });\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(result, 100);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (History);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/history.ts?\n}");

/***/ }),

/***/ "./src/commands/social.ts":
/*!********************************!*\
  !*** ./src/commands/social.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\nclass Social extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"social\", \"Lists all my social networks.\");\n    }\n    execute(args) {\n        const social = [\n            \"</br>\",\n            \"<p style='margin-left:20px;'>Linkedin      <a class='social-link' target='_blank' href='https://www.linkedin.com/in/yosef-mohamed-9563a22aa'>linkedin/YosefMohamed/</a></p>\",\n            \"<p style='margin-left:20px;'>Github        <a class='social-link' target='_blank' href='https://github.com/itsactuallyosef'>github/itsactuallyosef/</a></p>\",\n            \"<p style='margin-left:20px;'>Instagram     <a class='social-link' target='_blank' href='https://www.instagram.com/theyosefegy/'>instagram/theyosefegy/</a></p>\",\n            \"<p style='margin-left:20px;'>Facebook      <a class='social-link' target='_blank' href='https://www.facebook.com/yosef.mohammed.750546'>facebook/YosefMohamed/</a></p>\",\n            \"</br>\",\n        ];\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(social, 50);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Social);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/social.ts?\n}");

/***/ }),

/***/ "./src/commands/theme.ts":
/*!*******************************!*\
  !*** ./src/commands/theme.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _util_ThemeController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/ThemeController */ \"./src/util/ThemeController.ts\");\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n\n\n\n\nclass Theme extends _abstract__WEBPACK_IMPORTED_MODULE_0__.Command {\n    constructor() {\n        super(\"theme\", \"Change terminal theme.\");\n    }\n    execute(args) {\n        const arg = args[0];\n        if (!arg || arg === \"--list\") {\n            const lines = Object.keys(_util_ThemeController__WEBPACK_IMPORTED_MODULE_2__.themes);\n            (0,_animation__WEBPACK_IMPORTED_MODULE_3__.loopLines)(lines, 100);\n            return;\n        }\n        if (!(arg in _util_ThemeController__WEBPACK_IMPORTED_MODULE_2__.themes)) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(`Theme \"${arg}\" not found. Try '--list' to see available themes.`);\n        }\n        _util_ThemeController__WEBPACK_IMPORTED_MODULE_2__[\"default\"].applyTheme(arg);\n        _utility__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayOutputMessage(`Switched to theme: ${arg}`);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Theme);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/theme.ts?\n}");

/***/ }),

/***/ "./src/commands/unalias.ts":
/*!*********************************!*\
  !*** ./src/commands/unalias.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility */ \"./src/utility.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n\n\nclass Unalias extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"unalias\", \"Removes either all commands or for a specific one.\");\n    }\n    execute(args) {\n        if (!args.length) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(\"missing alias name. Usage: unalias <name>\");\n        }\n        const arg = args[0].toLowerCase();\n        if (!arg) {\n            throw new _abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(\"Please enter either 'all' or a specific command.\");\n        }\n        switch (arg) {\n            case \"all\":\n                window.localStorage.clear();\n                for (let [_, val] of _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap) {\n                    val.aliases = [];\n                }\n                _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(\"Cleared aliases for all commands!\");\n            default:\n                const command = _abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(arg);\n                if (!command) {\n                    throw new _abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(`The command \"${arg}\" is not recognized.`);\n                }\n                if (command.aliases.length === 0 && !localStorage.getItem(arg)) {\n                    throw new _abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(`No aliases found for \"${arg}\".`);\n                }\n                if (command.aliases.length > 0) {\n                    command.aliases = [];\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(`Successfully removed all aliases for \"${arg}\".`);\n                }\n                else {\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(`No aliases found for \"${arg}\".`);\n                }\n                // Remove from localStorage if it exists\n                if (localStorage.getItem(arg)) {\n                    localStorage.removeItem(arg);\n                    _utility__WEBPACK_IMPORTED_MODULE_0__[\"default\"].displayOutputMessage(`Removed \"${arg}\" from localStorage.`);\n                }\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unalias);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/unalias.ts?\n}");

/***/ }),

/***/ "./src/commands/whoisme.ts":
/*!*********************************!*\
  !*** ./src/commands/whoisme.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation */ \"./src/animation.ts\");\n/* harmony import */ var _abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom */ \"./src/dom.ts\");\n\n\n\nclass WhoIsMe extends _abstract__WEBPACK_IMPORTED_MODULE_1__.Command {\n    constructor() {\n        super(\"whoisme\", \"Who is Yosef?\");\n    }\n    execute(args) {\n        const preElement = document.createElement(\"pre\");\n        _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].terminal.appendChild(preElement);\n        const aboutme = `There's no 'about me', yet.`;\n        (0,_animation__WEBPACK_IMPORTED_MODULE_0__.loopLines)(aboutme.split(\"\\n\"), 100);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WhoIsMe);\n\n\n//# sourceURL=webpack://terfolio/./src/commands/whoisme.ts?\n}");

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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./src/animation.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n/* harmony import */ var _util_HistoryManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/HistoryManager */ \"./src/util/HistoryManager.ts\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utility */ \"./src/utility.ts\");\n\n\n\n\nfunction handleInput() {\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.textContent = _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value;\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.updateTyper)(_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value);\n}\nfunction handleKeyDown(event) {\n    if (event.key === \"Enter\") {\n        event.preventDefault(); // Prevent default Enter key behavior\n        _utility__WEBPACK_IMPORTED_MODULE_3__[\"default\"].handleCommand(_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value.trim());\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value = \"\"; // Clear the textarea\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.textContent = \"\"; // Clear the visible command line\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.focus(); // Keep focus on texter\n    }\n    if (event.key === \"ArrowUp\") {\n        const val = _util_HistoryManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"].previous();\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value = val;\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.textContent = val;\n    }\n    if (event.key === \"ArrowDown\") {\n        const val = _util_HistoryManager__WEBPACK_IMPORTED_MODULE_2__[\"default\"].next();\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.value = val;\n        _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].typer.textContent = val;\n    }\n}\nfunction focusTexter() {\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].texter.focus();\n    window.scrollTo({\n        top: document.body.scrollHeight,\n        behavior: \"smooth\", // Optional for smooth scrolling\n    });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ focusTexter, handleInput, handleKeyDown });\n// history array\n// event handling:\n//\t\tKEY DOWN: decrease index\n//\t\tKEY UP  : increase index\n// Handle \"out of reach\" error for the array.\n\n\n//# sourceURL=webpack://terfolio/./src/handlers.ts?\n}");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./src/animation.ts\");\n/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register */ \"./src/register.ts\");\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n/* harmony import */ var _util_ThemeController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/ThemeController */ \"./src/util/ThemeController.ts\");\n/* harmony import */ var _commands_cowsay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commands/cowsay */ \"./src/commands/cowsay.ts\");\n/* harmony import */ var _util_HistoryManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/HistoryManager */ \"./src/util/HistoryManager.ts\");\n\n\n\n\n\n\n\n_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.addEventListener(\"input\", _handlers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].handleInput);\n_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.addEventListener(\"keydown\", _handlers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].handleKeyDown);\nwindow.addEventListener(\"click\", _handlers__WEBPACK_IMPORTED_MODULE_2__[\"default\"].focusTexter);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    _util_ThemeController__WEBPACK_IMPORTED_MODULE_4__[\"default\"].loadSavedTheme();\n    _util_HistoryManager__WEBPACK_IMPORTED_MODULE_6__[\"default\"].loadSavedHistory();\n    const knownFigures = [\"default\", \"tux\", \"dragon\", \"moose\", \"elephant\",\n        \"ghostbusters\", \"kitty\", \"sodomized\", \"flaming-sheep\"];\n    const randFigure = knownFigures[Math.floor(Math.random() * knownFigures.length)];\n    new _commands_cowsay__WEBPACK_IMPORTED_MODULE_5__[\"default\"]().execute([randFigure, \"Hello, World!\"]);\n    _dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.focus();\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.updateTyper)(_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].texter.value);\n});\n\n\n//# sourceURL=webpack://terfolio/./src/main.ts?\n}");

/***/ }),

/***/ "./src/register.ts":
/*!*************************!*\
  !*** ./src/register.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _commands_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands/abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _commands_alias__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/alias */ \"./src/commands/alias.ts\");\n/* harmony import */ var _commands_cowsay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commands/cowsay */ \"./src/commands/cowsay.ts\");\n/* harmony import */ var _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commands/basic_cmds */ \"./src/commands/basic_cmds.ts\");\n/* harmony import */ var _commands_github__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commands/github */ \"./src/commands/github.ts\");\n/* harmony import */ var _commands_help__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commands/help */ \"./src/commands/help.ts\");\n/* harmony import */ var _commands_social__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./commands/social */ \"./src/commands/social.ts\");\n/* harmony import */ var _commands_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./commands/theme */ \"./src/commands/theme.ts\");\n/* harmony import */ var _commands_unalias__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./commands/unalias */ \"./src/commands/unalias.ts\");\n/* harmony import */ var _commands_whoisme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./commands/whoisme */ \"./src/commands/whoisme.ts\");\n/* harmony import */ var _commands_history__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./commands/history */ \"./src/commands/history.ts\");\n\n\n\n\n\n\n\n\n\n\n\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"help\", new _commands_help__WEBPACK_IMPORTED_MODULE_5__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"history\", new _commands_history__WEBPACK_IMPORTED_MODULE_10__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"github\", new _commands_github__WEBPACK_IMPORTED_MODULE_4__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"whoisme\", new _commands_whoisme__WEBPACK_IMPORTED_MODULE_9__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"social\", new _commands_social__WEBPACK_IMPORTED_MODULE_6__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"clear\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Clear());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"cowsay\", new _commands_cowsay__WEBPACK_IMPORTED_MODULE_2__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"theme\", new _commands_theme__WEBPACK_IMPORTED_MODULE_7__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"alias\", new _commands_alias__WEBPACK_IMPORTED_MODULE_1__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"unalias\", new _commands_unalias__WEBPACK_IMPORTED_MODULE_8__[\"default\"]());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"clear\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Clear());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"echo\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Echo());\n_commands_abstract__WEBPACK_IMPORTED_MODULE_0__.commandMap.set(\"exit\", new _commands_basic_cmds__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Exit());\n\n\n//# sourceURL=webpack://terfolio/./src/register.ts?\n}");

/***/ }),

/***/ "./src/util/HistoryManager.ts":
/*!************************************!*\
  !*** ./src/util/HistoryManager.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass HistoryManager {\n    constructor() {\n        this.history = [];\n        this.index = 0;\n        this.MAX_LENGTH = 100;\n    }\n    add(command) {\n        if (!command.trim())\n            return;\n        const last = this.history[this.history.length - 1];\n        // Skip duplicates\n        if (last && last.command === command)\n            return;\n        // Trim to max length\n        if (this.history.length >= this.MAX_LENGTH) {\n            this.history.shift();\n        }\n        this.history.push({ date: new Date(), command });\n        localStorage.setItem(\"history\", JSON.stringify(this.history));\n        localStorage.setItem(\"historyIndex\", String(this.index));\n        this.index = this.history.length;\n    }\n    previous() {\n        if (this.index > 0)\n            this.index--;\n        const entry = this.history[this.index];\n        return entry ? entry.command : \"\";\n    }\n    next() {\n        if (this.index < this.history.length)\n            this.index++;\n        const entry = this.history[this.index];\n        return entry ? entry.command : \"\";\n    }\n    all() {\n        return [...this.history];\n    }\n    clear() {\n        this.history = [];\n        localStorage.removeItem(\"history\");\n        this.index = 0;\n    }\n    loadSavedHistory() {\n        const saved = localStorage.getItem(\"history\");\n        if (!saved)\n            return;\n        this.index = Number(localStorage.getItem(\"historyIndex\"));\n        try {\n            const parsed = JSON.parse(saved);\n            this.history = parsed.map(entry => ({\n                ...entry,\n                date: new Date(entry.date),\n            }));\n        }\n        catch (e) {\n            console.error(\"Failed to load history:\", e);\n            this.history = [];\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new HistoryManager());\n\n\n//# sourceURL=webpack://terfolio/./src/util/HistoryManager.ts?\n}");

/***/ }),

/***/ "./src/util/ThemeController.ts":
/*!*************************************!*\
  !*** ./src/util/ThemeController.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   themes: () => (/* binding */ themes)\n/* harmony export */ });\n/* harmony import */ var _commands_abstract__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/abstract */ \"./src/commands/abstract.ts\");\n\nclass ThemeController {\n    constructor() {\n        this.currentTheme = 'default';\n        this.loadSavedTheme();\n        (this.currentTheme);\n    }\n    applyTheme(name) {\n        const theme = themes[name];\n        if (!theme) {\n            throw new _commands_abstract__WEBPACK_IMPORTED_MODULE_0__.CommandError(`The theme ${theme} doesn't exist...`);\n        }\n        Object.entries(theme).forEach(([key, value]) => {\n            document.documentElement.style.setProperty(`--${key}`, value);\n        });\n        this.currentTheme = name;\n        localStorage.setItem('theme', name);\n    }\n    loadSavedTheme() {\n        const saved = localStorage.getItem('theme');\n        if (saved && themes[saved]) {\n            this.applyTheme(saved);\n        }\n    }\n}\nconst themes = {\n    default: {\n        'command-name': '#8c6b59',\n        'preloaded-text': '#519975',\n        'background-color': '#211d1b',\n        'err-color': '#9c8394',\n        'typer-color': '#73abad',\n        'cursor-color': '#73abad',\n        'prompt-color': '#519975',\n        'terminalFont': 'monospace',\n        'link': '#ce97bd',\n        'link-hover': '#b796d6',\n        'command-description': '#fff',\n        'accent-color': '#ffffffbb',\n        'copyright-text': 'rgb(180, 180, 129)',\n    },\n    light: {\n        'command-name': '#336699',\n        'preloaded-text': '#008800',\n        'background-color': '#ffffff',\n        'err-color': '#aa4444',\n        'typer-color': '#444',\n        'cursor-color': '#444',\n        'prompt-color': '#444',\n        'terminalFont': 'monospace',\n        'link': '#0000ee',\n        'link-hover': '#551a8b',\n        'command-description': '#222',\n        'accent-color': '#222222aa',\n        'copyright-text': '#666',\n    },\n    hacker: {\n        'command-name': '#00ff00',\n        'preloaded-text': '#00aa00',\n        'background-color': '#000000',\n        'err-color': '#ff0000',\n        'typer-color': '#00ff00',\n        'cursor-color': '#00ff00',\n        'prompt-color': '#00ff00',\n        'terminalFont': 'monospace',\n        'link': '#00ffff',\n        'link-hover': '#ff00ff',\n        'command-description': '#00ff00',\n        'accent-color': '#00ff00aa',\n        'copyright-text': '#888',\n    },\n    solarized: {\n        'command-name': '#268bd2',\n        'preloaded-text': '#2aa198',\n        'background-color': '#fdf6e3',\n        'err-color': '#dc322f',\n        'typer-color': '#657b83',\n        'cursor-color': '#657b83',\n        'prompt-color': '#859900',\n        'terminalFont': 'monospace',\n        'link': '#6c71c4',\n        'link-hover': '#d33682',\n        'command-description': '#586e75',\n        'accent-color': '#839496aa',\n        'copyright-text': '#93a1a1',\n    },\n    dracula: {\n        'command-name': '#ff79c6',\n        'preloaded-text': '#50fa7b',\n        'background-color': '#282a36',\n        'err-color': '#ff5555',\n        'typer-color': '#f8f8f2',\n        'cursor-color': '#f8f8f2',\n        'prompt-color': '#bd93f9',\n        'terminalFont': 'monospace',\n        'link': '#8be9fd',\n        'link-hover': '#ffb86c',\n        'command-description': '#f1fa8c',\n        'accent-color': '#ffffffbb',\n        'copyright-text': '#6272a4',\n    },\n    nord: {\n        'command-name': '#81a1c1',\n        'preloaded-text': '#a3be8c',\n        'background-color': '#2e3440',\n        'err-color': '#bf616a',\n        'typer-color': '#d8dee9',\n        'cursor-color': '#d8dee9',\n        'prompt-color': '#88c0d0',\n        'terminalFont': 'monospace',\n        'link': '#5e81ac',\n        'link-hover': '#b48ead',\n        'command-description': '#e5e9f0',\n        'accent-color': '#eceff4aa',\n        'copyright-text': '#4c566a',\n    },\n    retro: {\n        'command-name': '#ffaa00',\n        'preloaded-text': '#00ffff',\n        'background-color': '#000000',\n        'err-color': '#ff0000',\n        'typer-color': '#00ffff',\n        'cursor-color': '#ffaa00',\n        'prompt-color': '#ffaa00',\n        'terminalFont': '\"Courier New\", monospace',\n        'link': '#ffff00',\n        'link-hover': '#ff00ff',\n        'command-description': '#ffffff',\n        'accent-color': '#ffff00aa',\n        'copyright-text': '#888800',\n    },\n    minimal: {\n        'command-name': '#111',\n        'preloaded-text': '#333',\n        'background-color': '#f5f5f5',\n        'err-color': '#cc0000',\n        'typer-color': '#111',\n        'cursor-color': '#111',\n        'prompt-color': '#666',\n        'terminalFont': 'monospace',\n        'link': '#0066cc',\n        'link-hover': '#004499',\n        'command-description': '#000',\n        'accent-color': '#00000066',\n        'copyright-text': '#999',\n    },\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ThemeController());\n\n\n//# sourceURL=webpack://terfolio/./src/util/ThemeController.ts?\n}");

/***/ }),

/***/ "./src/utility.ts":
/*!************************!*\
  !*** ./src/utility.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./src/animation.ts\");\n/* harmony import */ var _commands_abstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commands/abstract */ \"./src/commands/abstract.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ \"./src/dom.ts\");\n/* harmony import */ var _util_HistoryManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/HistoryManager */ \"./src/util/HistoryManager.ts\");\n\n\n\n\nfunction displayErrorMessage(msg) {\n    const errorOutput = document.createElement(\"p\");\n    errorOutput.classList.add(\"error\");\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.typetext)(msg, errorOutput, 1);\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].terminal.append(errorOutput); // Insert before the input line\n}\nfunction displayOutputMessage(message, isPreloaded = false, animationDelay = 0) {\n    const output = document.createElement(\"p\");\n    isPreloaded ? output.classList.add(\"preloaded-msg\") : \"\";\n    isPreloaded ? output.classList.add(\"no-animation\") : \"\";\n    (0,_animation__WEBPACK_IMPORTED_MODULE_0__.typetext)(message, output, animationDelay);\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].texter.value = \"\";\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].typer.textContent = \"\";\n    _dom__WEBPACK_IMPORTED_MODULE_2__[\"default\"].terminal.append(output); // Insert before the input line\n}\nfunction findCommandByAlias(alias) {\n    alias = alias.toLowerCase();\n    const commandName = window.localStorage.getItem(alias);\n    if (commandName) {\n        const cmd = _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(commandName.toLowerCase());\n        if (cmd && cmd.aliases) {\n            cmd.aliases.push(alias);\n            return cmd;\n        }\n    }\n    // Search through commandMap for the alias\n    for (let [_, value] of _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap) {\n        if (!value || !value.aliases)\n            continue;\n        // Return the command object if alias is found in commandMap\n        if (value.aliases.includes(alias)) {\n            return value;\n        }\n        else if (commandName) {\n            // if the there's a command who has this alias in the local storage, get it from the commandMap, then add the alias to its list\n            // before returning it from the command map.\n        }\n    }\n    // Return null if alias not found\n    return null;\n}\nfunction handleCommand(input) {\n    if (!input.trim())\n        return;\n    _util_HistoryManager__WEBPACK_IMPORTED_MODULE_3__[\"default\"].add(input);\n    displayOutputMessage(input, true); // echo the command\n    try {\n        const [name, ...args] = input.trim().split(/\\s+/);\n        const command = _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.commandMap.get(name.toLowerCase()) ||\n            findCommandByAlias(name.toLowerCase());\n        if (!command) {\n            throw new _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError(`The command \"${name}\" is not recognized. Type \"help\" to see available commands.`);\n        }\n        command.execute(args);\n    }\n    catch (err) {\n        if (err instanceof _commands_abstract__WEBPACK_IMPORTED_MODULE_1__.CommandError) {\n            displayErrorMessage(err.message);\n        }\n        else {\n            console.error(err);\n            displayErrorMessage(\"An unexpected error occurred.\");\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ displayErrorMessage, displayOutputMessage, handleCommand });\n\n\n//# sourceURL=webpack://terfolio/./src/utility.ts?\n}");

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