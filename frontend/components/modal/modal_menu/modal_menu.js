export class ModalMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setDimensions(width, height) {
        if (width) this.shadowRoot.querySelector('.menu_container').style.width = width;
        if (height) this.shadowRoot.querySelector('.menu_container').style.height = height;
    }

    async connectedCallback() {
        const res = await fetch('/components/modal/modal_menu/modal_menu.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // Set width/height
        this.setDimensions(this.shadowRoot.host.getAttribute('width'), this.shadowRoot.host.getAttribute('height'));
        
        // Opacity of BG
        const opacity = this.shadowRoot.host.getAttribute('opacity');
        if (opacity) {
            this.shadowRoot.host.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        }

        // Vertical centring (center for consistency)
        const center = this.shadowRoot.host.getAttribute('center');

        const menu_body = this.shadowRoot.host.querySelector('menu-body');
        if (menu_body && (center === '' || center)) {
            menu_body.style.display = 'flex';
            menu_body.style.justifyContent = 'center';
            menu_body.style.height = '100%';
        }

        this.addEventListener('close-menu', (event) => {
            this.remove();
        });
    }
}
customElements.define('modal-menu', ModalMenu);