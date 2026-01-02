// Menu button
export class MenuButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_button/menu_button.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-button', MenuButton);