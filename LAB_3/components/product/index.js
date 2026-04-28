export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Цвета для приоритета
        let priorityColor;
        let priorityTextColor = 'white';
        if (data.priority === 'high') {
            priorityColor = '#8a5e6a';   // серо-красный
        } else if (data.priority === 'medium') {
            priorityColor = '#8a7a5a';   // серо-жёлтый
        } else {
            priorityColor = '#6e7a8a';   // серо-синий
        }

        // Цвета для статуса
        let statusColor;
        let statusText;
        if (data.status === 'pending') {
            statusColor = '#8a7a5a';
            statusText = 'Ожидает выполнения';
        } else {
            statusColor = '#5a7a6e';
            statusText = 'Выполняется';
        }

        return `
            <div class="card mb-4">
                <div class="card-header" style="background-color: #5a6e7a; color: white;">
                    <h3>Заявка на расчёты</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Вычислительный узел #${data.nodeId}</h4>
                            <p><strong>Производительность:</strong> ${data.performance} GFLOPS</p>
                            <p><strong>CPU:</strong> ${data.cpu}</p>
                            <p><strong>RAM:</strong> ${data.ram} GB</p>
                            <p><strong>Хранилище:</strong> ${data.storage} GB</p>
                            <p><strong>Текущая загрузка:</strong> ${data.load}%</p>
                        </div>
                        <div class="col-md-6">
                            <h4>Параметры расчётов</h4>
                            <p><strong>Пакет расчётов:</strong> ${data.jobName}</p>
                            <p><strong>Требуемое время выполнения:</strong> ${data.requiredTime} часов</p>
                            <p><strong>Приоритет:</strong>
                                <span class="badge" style="background-color: ${priorityColor}; color: ${priorityTextColor};">
                                    ${data.priorityText}
                                </span>
                            </p>
                            <p><strong>Количество ядер:</strong> ${data.cores}</p>
                            <p><strong>Требуемая память:</strong> ${data.requiredRAM} GB</p>
                            <p><strong>Статус:</strong>
                                <span class="badge" style="background-color: ${statusColor}; color: white;">
                                    ${statusText}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="alert" style="background-color: #d6dee3; border-color: #b0bec9; color: #2a3a4a;">
                            <strong>Прогноз выполнения:</strong>
                            ${data.forecast}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
