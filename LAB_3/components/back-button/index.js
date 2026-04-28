export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener);
    }

    getHTML() {
        return `
            <div class="mb-3">
                <button id="back-button" class="btn btn-secondary" type="button">
                    ← Назад к узлам
                </button>
            </div>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
