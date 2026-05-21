export class FilterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render({ value, onSubmit, onReset }) {
        const form = document.createElement('form');
        form.className = 'filter';
        form.innerHTML = `
            <input class="input" name="title" type="search" placeholder="Фильтр по названию" value="${value}">
            <button class="button" type="submit">Фильтровать</button>
            <button class="button button_secondary" type="button" data-reset>Сбросить</button>
        `;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            onSubmit(new FormData(form).get('title').trim());
        });

        form.querySelector('[data-reset]').addEventListener('click', onReset);
        this.parent.append(form);
    }
}
