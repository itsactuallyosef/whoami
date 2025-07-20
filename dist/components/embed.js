"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embed = void 0;
const animation_js_1 = require("../animation.js");
const abstract_js_1 = require("./abstract.js");
class Embed extends abstract_js_1.Component {
    constructor({ title, description, link, imageURL, color = "#997c51", footer, fields = [], }) {
        super(); // Call the constructor of Component
        this.title = title;
        this.description = description;
        this.link = link;
        this.imageURL = imageURL;
        this.color = color;
        this.footer = footer;
        this.fields = fields;
        this.container.classList.add("embed");
        this.container.style.borderColor = `${this.color}`;
        this.container.style.borderStyle = "solid";
        this.fieldsContainer = document.createElement("div");
        this.fieldsContainer.classList.add("fields");
        this.container.appendChild(this.fieldsContainer);
        this.createEmbed();
        this.updateFields(); // Initialize fields
    }
    createEmbed() {
        var _a;
        if (this.title) {
            const embedTitle = document.createElement("h3");
            embedTitle.classList.add("embedTitle");
            embedTitle.textContent = this.title;
            if (this.imageURL || this.description)
                embedTitle.style.marginBottom = "5px";
            embedTitle.style.letterSpacing = "-0.8px";
            this.container.appendChild(embedTitle);
        }
        if (this.description) {
            const embedDescription = document.createElement("p");
            embedDescription.classList.add("embedDescription");
            if (!this.imageURL)
                embedDescription.style.gridColumn = "1/-1";
            (0, animation_js_1.typetext)(this.description, embedDescription, 50);
            this.container.appendChild(embedDescription);
        }
        if (this.imageURL) {
            const embedImage = document.createElement("img");
            embedImage.src = this.imageURL;
            embedImage.classList.add("embedImage");
            embedImage.style.width = "300px";
            embedImage.style.padding = "10px";
            this.container.appendChild(embedImage);
        }
        if (this.link) {
            const embedLink = document.createElement("a");
            embedLink.href = this.link;
            embedLink.textContent = "View More";
            embedLink.style.color = (_a = this.color) !== null && _a !== void 0 ? _a : "#997c51";
            embedLink.style.textDecoration = "none";
            embedLink.style.fontWeight = "bold";
            embedLink.target = "_blank";
            embedLink.classList.add("embedLink");
            this.container.appendChild(embedLink);
        }
        if (this.footer) {
            const embedFooter = document.createElement("p");
            embedFooter.classList.add("embedFooter");
            embedFooter.textContent = this.footer;
            embedFooter.style.fontSize = "12px";
            embedFooter.style.marginTop = "10px";
            this.container.appendChild(embedFooter);
        }
    }
    createField(key, value) {
        var _a;
        ((_a = this.fields) !== null && _a !== void 0 ? _a : (this.fields = [])).push({ title: key, value: value });
        this.updateFields();
    }
    updateFields() {
        // Clear existing fields
        if (this.fieldsContainer) {
            this.fieldsContainer.innerHTML = "";
        }
        if (!this.fieldsContainer || !this.fields || this.fields.length === 0)
            return;
        // Create and append fields
        this.fields.forEach((field) => {
            const fieldElement = document.createElement("div");
            fieldElement.classList.add("field");
            const fieldTitle = document.createElement("div");
            fieldTitle.classList.add("field-title");
            fieldTitle.textContent = field.title;
            const fieldValue = document.createElement("div");
            fieldValue.classList.add("field-value");
            fieldValue.textContent = field.value;
            fieldElement.appendChild(fieldTitle);
            fieldElement.appendChild(fieldValue);
            this.fieldsContainer.appendChild(fieldElement);
        });
    }
}
exports.Embed = Embed;
