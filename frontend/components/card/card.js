class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/card/card.html');
        const html = await res.text();
        this.shadowRoot.innerHTML = html;

        const slot = this.shadowRoot.querySelector('slot');
        const card = this.shadowRoot.querySelector('.card');

        const updateContent = () => {
            const nodes = slot.assignedNodes();
            if (nodes.length === 0) return;

            card.innerHTML = ''; 
            nodes.forEach(node => {
                // Only clone Element nodes (skip empty text/whitespace nodes)
                if (node.nodeType === Node.ELEMENT_NODE) {
                    card.append(node.cloneNode(true));
                }
            });
            
            // Re-apply variation to ensure the link tag is in the right place
            this.applyVariation();
        };

        slot.addEventListener('slotchange', updateContent);
        updateContent();

        this.addEventListener('click', () => {
            const link = this.getAttribute('link');
            if (link) document.location.href = link;
        });
    }

    async connectedCallback2() {
        const res = await fetch('/components/card/card.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;

        // Move elements from slot to shadow DOM
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            const nodes = slot.assignedNodes();
            const card = this.shadowRoot.querySelector('.card');
            
            // Clear previous content and clone new nodes
            card.innerHTML = ''; 
            nodes.forEach(node => {
                card.append(node.cloneNode(true));
            });
        });

        this.applyVariation();

        // On click
        this.addEventListener('click', () => {
            const link = this.getAttribute('link') || null;

            if (link) document.location = link;
        });
    }

    applyVariation() {
        const variant = this.shadowRoot.host.parentElement.getAttribute('variant');

        let href = `/components/card/styles/default.css`;;
        switch (variant) {
            case 'flat':
                href = `/components/card/styles/flat.css`;
            break;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;

        this.shadowRoot.prepend(link);
    }
}

class CardContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const res = await fetch('/components/card/card_container.html');
        const html = await res.text();

        this.shadowRoot.innerHTML = html;
    }
}

customElements.define('page-card', Card);
customElements.define('card-container', CardContainer);