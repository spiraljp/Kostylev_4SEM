export class ButtonGroupComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="btn-group mb-4" role="group" aria-label="Фильтрация узлов">
                <button type="button" class="btn btn-outline-success" data-filter="all">Все узлы</button>
                <button type="button" class="btn btn-outline-success" data-filter="high">Высокая ⚡</button>
                <button type="button" class="btn btn-outline-warning" data-filter="medium">Средняя 📊</button>
                <button type="button" class="btn btn-outline-danger" data-filter="low">Низкая 🐢</button>
            </div>
        `;
    }

    addListeners(listener) {
        const buttons = document.querySelectorAll('.btn-group .btn');
        buttons.forEach(button => {
            button.addEventListener('click', listener);
        });
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
