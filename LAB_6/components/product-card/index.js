export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let borderColor = '#5a7a6e';
        let priorityText = 'Низкий';

        if (data.priority >= 7) {
            borderColor = '#8a5e6a';
            priorityText = 'Высокий';
        } else if (data.priority >= 4) {
            borderColor = '#8a7a5a';
            priorityText = 'Средний';
        }

        const statusBadge = data.status === 'completed'
            ? '<span class="badge" style="background-color: #5a7a6e; color: white;">Выполнено</span>'
            : '<span class="badge" style="background-color: #8a7a5a; color: white;">Ожидает</span>';

        const progressValue = Math.min(Number(data.priority) * 10, 100);

        return `
            <div class="card h-100 grid-card" style="border-left-color: ${borderColor};">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <strong>Задание #${data.id}</strong>
                    ${statusBadge}
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title job-card-title">${data.title}</h5>
                    <p class="card-text text-muted job-card-description">${data.description}</p>
                    <div class="progress mb-3">
                        <div class="progress-bar" style="width: ${progressValue}%; background-color: ${borderColor};">
                            ${data.priority}
                        </div>
                    </div>
                    <div class="mt-auto">
                        <div class="d-flex flex-wrap gap-2 mb-3 job-card-meta">
                            <span class="badge" style="background-color: ${borderColor}; color: white;">${priorityText} приоритет</span>
                            <span class="badge text-bg-light text-dark">Цена: ${data.price}</span>
                        </div>
                        <button
                            class="btn grid-btn w-100"
                            id="click-card-${data.id}"
                            data-id="${data.id}"
                            type="button"
                        >
                            Редактировать
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
