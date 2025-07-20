"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor() {
        this.container = document.createElement("div");
    }
    renderIn(targetElement) {
        targetElement.appendChild(this.container);
    }
}
exports.Component = Component;
