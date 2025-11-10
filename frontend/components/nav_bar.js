class NavBar extends HTMLElement {
    constructor() {
        super(); // must run super as this constructor is prioritised over the HTMLElement class constructor

        // Use shadow DOM to prevetns styling conflicts between this element and the parent DOM
        this.attachShadow({ mode: 'open' }); // mode open makes shadowRoot accessible via element.shadowRoot in JS

        const tempStyle = document.createElement('style');
        // host refers to self
        tempStyle.textContent = `
            :host {
                display: block;
                height: 150px;
            }
        `;

        this.shadowRoot.append(tempStyle);


    }

    // when element is added to DOM
    async connectedCallback() {
        const response = await fetch('/components/nav_bar.html');
        const html = await response.text(); // use text method for HTML

        this.shadowRoot.innerHTML = html;


        // Click on main bar to return to home
        this.shadowRoot.addEventListener('click', (event) => {
            const target = event.target;

            if (target.id === 'title' || target.id === 'logo') document.location = '/';
        });
    }

    // when element is removed from DOM
    disconnectedCallback() {

    }
}

customElements.define('page-nav', NavBar);