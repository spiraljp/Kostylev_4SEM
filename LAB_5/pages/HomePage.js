import { navigate } from '../main.js';
import { JobCardComponent } from '../components/JobCardComponent.js';
import { FilterComponent } from '../components/FilterComponent.js';
import { ajax } from '../modules/ajax.js';
import { jobUrls } from '../modules/jobUrls.js';

export class HomePage {
    constructor(parent) {
        this.parent = parent;
        this.pageRoot = null;
        this.cardsRoot = null;
        this.currentTitle = new URLSearchParams(window.location.search).get('title') || '';
    }

    getHTML() {
        return `
            <section class="page">
                <div class="header">
                    <div>
                        <h1 class="header__title">Планирование заданий</h1>
                        <p class="header__subtitle">Задания отображаются в grid-системе и загружаются из API через XMLHttpRequest.</p>
                    </div>
                    <button class="button" type="button" data-create>Добавить</button>
                </div>
                <div data-filter></div>
                <div class="cards" data-cards></div>
            </section>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.pageRoot = this.parent.querySelector('.page');
        this.cardsRoot = this.parent.querySelector('[data-cards]');

        this.parent.querySelector('[data-create]').addEventListener('click', () => {
            navigate('page=create');
        });

        new FilterComponent(this.parent.querySelector('[data-filter]')).render({
            value: this.currentTitle,
            onSubmit: (title) => this.applyFilter(title),
            onReset: () => this.applyFilter('')
        });

        this.getData();
    }

    applyFilter(title) {
        const query = title ? `title=${encodeURIComponent(title)}` : '';
        navigate(query);
    }

    getData() {
        this.cardsRoot.innerHTML = '<div class="state">Загрузка данных...</div>';

        ajax.get(jobUrls.getJobs(this.currentTitle), (data, status) => {
            if (status < 200 || status >= 300 || !Array.isArray(data)) {
                this.cardsRoot.innerHTML = '<div class="state">Не удалось загрузить данные. Проверьте сервер API и CORS Unblock.</div>';
                return;
            }

            const filteredData = this.filterByTitle(data);
            this.renderData(filteredData);
        });
    }

    filterByTitle(items) {
        if (!this.currentTitle) {
            return items;
        }

        const title = this.currentTitle.toLowerCase();
        return items.filter((item) => item.title.toLowerCase().includes(title));
    }

    renderData(items) {
        this.cardsRoot.innerHTML = '';

        if (!items.length) {
            this.cardsRoot.innerHTML = '<div class="state">Ничего не найдено.</div>';
            return;
        }

        items.forEach((item) => {
            new JobCardComponent(this.cardsRoot).render(item, (id) => {
                navigate(`page=edit&id=${id}`);
            });
        });
    }
}
