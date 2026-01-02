// Menu header (container)
export class MenuHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_header/menu_header.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-header', MenuHeader);