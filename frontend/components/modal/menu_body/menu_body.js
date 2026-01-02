// Menu body (container)
export class MenuBody extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_body/menu_body.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }

    scrollToEnd() {
        this.shadowRoot.host.scrollTo({
            top: this.shadowRoot.host.scrollHeight,
            behavior: 'smooth'
        });
    }
}
customElements.define('menu-body', MenuBody);