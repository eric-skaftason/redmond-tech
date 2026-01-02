// List input
export class ListInput extends HTMLElement {
    #elements = []; // should be an array of strings
    #maxStringLen = 64;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/list_input/list_input.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // initialise #elements        
        const list_elements = this.shadowRoot.host.querySelectorAll('list-element');

        for (let i = list_elements.length - 1; i >= 0; i--) {
            const list_element = list_elements[i];
            let element_text = list_element.innerText;

            if (element_text.length > this.#maxStringLen) {
                element_text = element_text.slice(0, this.#maxStringLen);
                list_elements[i].innerText = element_text;
            }

            this.#elements.unshift(element_text);
        }

        // slot is visible to this.shadowRoot but not this.shadowRoot.host
        // slotted elements are projected to the shadow dom, and slot is removed
        this.shadowRoot.querySelector('slot').hidden = false;
    }

    getNewElement(text) {
        const list_element = document.createElement('list-element');
        list_element.innerText = text;

        return list_element;
    }

    getElements() {
        return this.#elements;
    }

    getElementIndex(element) {
        const allElements = Array.from(this.shadowRoot.host.querySelectorAll('list-element'));
        return allElements.indexOf(element);
    }

    prependElement(text) {
        if (typeof text !== 'string' || text.length > this.#maxStringLen) throw new Error('Invalid string');

        this.#elements.unshift(text);
        this.shadowRoot.host.prepend(this.getNewElement(text));
    }

    addElement(index, text) {
        if (typeof text !== 'string' || text.length > this.#maxStringLen) throw new Error('Invalid string');
        if (index < 0 || index >= this.#elements.length) throw new Error('Invalid index');

        if (index === this.#elements.length - 1) return this.appendElement(text);
        if (index === 0) return this.prependElement(text);

        // insert at index, remove 0, insert element
        this.#elements.splice(index, 0, text);

        this.shadowRoot.host.insertBefore(this.getNewElement(text), this.shadowRoot.host.querySelectorAll('list-element')[index]);
    }

    appendElement(text) {
        if (typeof text !== 'string' || text.length > this.#maxStringLen) throw new Error('Invalid string');

        this.#elements.push(text);

        this.shadowRoot.host.insertBefore(this.getNewElement(text), this.shadowRoot.host.querySelector('list-add-element'));
    }

    removeElement(element) {
        const index = this.getElementIndex(element);
        if (index == null || index < 0 || index >= this.#elements.length) throw new Error('Invalid index');

        this.#elements.splice(index, 1);
        element.remove();
    }
}
customElements.define('list-input', ListInput);