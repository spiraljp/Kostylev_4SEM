import { ProductCardComponent } from "../../components/product-card/index.js";
import { FilterComponent } from "../../components/filter/index.js";
import { TasksPage } from "../tasks/index.js";
import { JobFormPage } from "../job-form/index.js";
import { ajax } from "../../modules/ajax.js";
import { jobUrls } from "../../modules/jobUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentTitle = '';
    }

    get filterRoot() {
        return document.getElementById('filter-section');
    }

    get cardsRoot() {
        return document.getElementById('cards-container');
    }

    getHTML() {
        return `
            <div class="container app-shell">
                <div class="page-heading text-center">
                    <h1 class="grid-title">Grid-система: планирование заданий</h1>
                    <p class="text-muted grid-subtitle">
                        Задания загружаются из API 4-й лабораторной через XMLHttpRequest.
                    </p>
                </div>

                <div class="toolbar">
                    <button id="tasks-button" class="btn grid-btn" type="button">Домашка</button>
                    <button id="add-job-btn" class="btn grid-btn" type="button">+ Добавить задание</button>
                </div>

                <div id="filter-section" class="filter-panel"></div>
                <div id="cards-container" class="row cards-grid"></div>
            </div>
        `;
    }

    getData() {
        this.cardsRoot.innerHTML = '<div class="col-12"><div class="alert alert-secondary">Загрузка заданий...</div></div>';

        ajax.get(jobUrls.getJobs(this.currentTitle), (data, status) => {
            if (status < 200 || status >= 300 || !Array.isArray(data)) {
                this.cardsRoot.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-danger">
                            Не удалось загрузить данные. Проверьте сервер 4-й лабораторной и CORS Unblock.
                        </div>
                    </div>
                `;
                return;
            }

            this.renderData(this.filterByTitle(data));
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
            this.cardsRoot.innerHTML = '<div class="col-12"><div class="alert alert-warning">Задания не найдены.</div></div>';
            return;
        }

        items.forEach((item) => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'col-md-6 col-lg-4';
            this.cardsRoot.appendChild(cardWrapper);

            const card = new ProductCardComponent(cardWrapper);
            card.render(item, this.clickCard.bind(this));
        });
    }

    applyFilter(title) {
        this.currentTitle = title;
        this.getData();
    }

    clickCard(event) {
        const cardId = event.target.dataset.id;
        const jobFormPage = new JobFormPage(this.parent, cardId);
        jobFormPage.render();
    }

    addJob() {
        const jobFormPage = new JobFormPage(this.parent);
        jobFormPage.render();
    }

    goToTasks() {
        const tasksPage = new TasksPage(this.parent);
        tasksPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const filter = new FilterComponent(this.filterRoot);
        filter.render(
            this.currentTitle,
            this.applyFilter.bind(this),
            () => this.applyFilter('')
        );

        this.getData();

        document.getElementById('tasks-button')?.addEventListener('click', this.goToTasks.bind(this));
        document.getElementById('add-job-btn')?.addEventListener('click', this.addJob.bind(this));
    }
}
