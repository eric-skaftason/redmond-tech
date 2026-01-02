// Menu controller
class MenuController extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/menu_controller/menu_controller.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}
customElements.define('menu-controller', MenuController);

// Menu controller (close menu button)
class Controller_CloseMenu extends MenuController {
    constructor() {
        super();
    }

    async connectedCallback() {
        await super.connectedCallback();

        this.shadowRoot.host.textContent = 'x';

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('close-menu', {
                bubbles: true, // allows the event to move up the dom
                composed: true // allows the event to move up the dom, outside any shadow dom layers
            }));
        });
    }
}
customElements.define('close-menu', Controller_CloseMenu);

export default { MenuController, Controller_CloseMenu };