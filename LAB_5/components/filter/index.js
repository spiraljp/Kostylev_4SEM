export class FilterComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(value = '') {
        return `
            <form id="job-filter-form" class="row g-3 align-items-center justify-content-center">
                <div class="col-md-6">
                    <input
                        class="form-control"
                        name="title"
                        type="search"
                        placeholder="Фильтр по названию задания"
                        value="${value}"
                    >
                </div>
                <div class="col-auto">
                    <button class="btn grid-btn" type="submit">Фильтровать</button>
                </div>
                <div class="col-auto">
                    <button id="reset-filter" class="btn btn-secondary" type="button">Сбросить</button>
                </div>
            </form>
        `;
    }

    addListeners(onFilter, onReset) {
        document.getElementById('job-filter-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const title = new FormData(event.target).get('title').trim();
            onFilter(title);
        });

        document.getElementById('reset-filter').addEventListener('click', onReset);
    }

    render(value, onFilter, onReset) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(value));
        this.addListeners(onFilter, onReset);
    }
}
