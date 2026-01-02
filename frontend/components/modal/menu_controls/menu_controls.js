// Menu controls (container)
export class MenuControls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_controls/menu_controls.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-controls', MenuControls);