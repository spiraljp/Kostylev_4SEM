export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        let borderColor;
        if (data.performance >= 80) borderColor = '#5a7a6e';
        else if (data.performance >= 50) borderColor = '#8a7a5a';
        else borderColor = '#8a5e6a';

        let progressColor;
        if (data.performance >= 80) progressColor = '#5a7a6e';
        else if (data.performance >= 50) progressColor = '#8a7a5a';
        else progressColor = '#8a5e6a';

        const availabilityBadge = data.available
            ? '<span class="badge" style="background-color: #5a7a6e; color: white;">Доступен</span>'
            : '<span class="badge" style="background-color: #8a5e6a; color: white;">Занят</span>';

        return `
            <div class="card" style="width: 320px; border-left: 3px solid ${borderColor};">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <strong>Узел #${data.id}</strong>
                    ${availabilityBadge}
                </div>
                <div class="card-body">
                    <h5 class="card-title">Производительность: ${data.performance} GFLOPS</h5>
                    <div class="progress mb-3">
                        <div class="progress-bar" style="width: ${data.performance}%; background-color: ${progressColor};">
                            ${data.performance}%
                        </div>
                    </div>
                    <p class="card-text">
                        <strong>CPU:</strong> ${data.cpu}<br>
                        <strong>RAM:</strong> ${data.ram} GB<br>
                        <strong>Хранилище:</strong> ${data.storage} GB<br>
                        <strong>Текущая загрузка:</strong> ${data.load}%
                    </p>
                    <button class="btn"
                            id="click-card-${data.id}"
                            data-id="${data.id}"
                            style="background-color: #5a6e7a; border-color: #4a5a66; color: white;">
                        Выбрать для расчётов
                    </button>
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
