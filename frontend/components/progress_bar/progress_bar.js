class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.calibration;
    }

    async connectedCallback() {
        const response = await fetch('/components/progress_bar/progress_bar.html');
        const html = await response.text();
        this.shadowRoot.innerHTML = html;

        this.calibration = JSON.parse(this.getAttribute('data-calibration'));

        this.bar_container = this.shadowRoot.querySelector('.bar_container');
        this.bar = this.shadowRoot.querySelector('.bar');

        // Set colour
        const container_color = this.getAttribute('containerColor');
        if (container_color) this.bar_container.style.backgroundColor = container_color;

        const bar_color = this.getAttribute('barColor');
        if (bar_color) this.bar.style.backgroundColor = bar_color;

        // Set dimensions
        const width = this.getAttribute('width');
        const height = this.getAttribute('height');
        if (width) this.bar_container.style.width = `${width}px`;
        if (height) this.bar_container.style.height = `${height}px`;


        // Bar movement
        this.update(0);
    }

    update(checkpointIndex = 0) {
        const checkpoints = this.calibration.checkpoints;

        if (checkpointIndex >= checkpoints.length) return;

        const current_checkpoint = checkpoints[checkpointIndex];
        const percent = current_checkpoint[0];
        const ms = current_checkpoint[1];
        const transition = current_checkpoint[2] || 'linear';

        this.bar.offsetWidth; // browser recalculates layout to ensure first transition occurs properly
        this.bar.style.transition = `width ${ms}ms ${transition}`; // smooth transition

        this.bar.style.width = `${percent}%`;

        setTimeout(() => {
            this.update(checkpointIndex + 1)
        }, ms);
    }

}

customElements.define('progress-bar', ProgressBar);