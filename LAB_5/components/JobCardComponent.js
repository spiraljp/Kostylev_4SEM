export class JobCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(job, onEdit) {
        const article = document.createElement('article');
        article.className = 'card';
        article.innerHTML = `
            <h2 class="card__title">${job.title}</h2>
            <p class="card__description">${job.description}</p>
            <div class="card__meta">
                <span class="badge">ID: ${job.id}</span>
                <span class="badge">Статус: ${job.status}</span>
                <span class="badge">Приоритет: ${job.priority}</span>
                <span class="badge">Цена: ${job.price}</span>
            </div>
            <div class="card__actions">
                <button class="button" type="button">Редактировать</button>
            </div>
        `;

        article.querySelector('button').addEventListener('click', () => onEdit(job.id));
        this.parent.append(article);
    }
}
