// Menu title
export class MenuTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_title/menu_title.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-title', MenuTitle);