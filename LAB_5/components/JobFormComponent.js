export class JobFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(job = {}) {
        const form = document.createElement('form');
        form.className = 'form';
        form.innerHTML = `
            <label class="field">
                <span class="field__label">Название</span>
                <input class="input" name="title" type="text" value="${job.title || ''}" placeholder="Введите название">
            </label>
            <label class="field">
                <span class="field__label">Описание</span>
                <textarea class="textarea" name="description" placeholder="Введите описание">${job.description || ''}</textarea>
            </label>
            <label class="field">
                <span class="field__label">Приоритет</span>
                <input class="input" name="priority" type="number" min="1" value="${job.priority || ''}" placeholder="Например, 5">
            </label>
            <label class="field">
                <span class="field__label">Статус</span>
                <input class="input" name="status" type="text" value="${job.status || ''}" placeholder="pending">
            </label>
            <label class="field">
                <span class="field__label">Цена</span>
                <input class="input" name="price" type="number" min="0" value="${job.price || ''}" placeholder="Например, 200">
            </label>
        `;

        form.addEventListener('submit', (event) => event.preventDefault());
        this.parent.append(form);
    }
}
