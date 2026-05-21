import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { jobUrls } from "../../modules/jobUrls.js";

export class JobFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('job-form-page');
    }

    getHTML() {
        const title = this.id ? 'Редактирование задания' : 'Добавление задания';
        const subtitle = this.id ? 'Поля заполнены данными выбранного задания из API.' : '';

        return `
            <div class="container app-shell">
                <div id="job-form-page" class="form-shell">
                    <div class="page-heading text-center">
                        <h1 class="grid-title">${title}</h1>
                        ${subtitle ? `<p class="text-muted grid-subtitle">${subtitle}</p>` : ''}
                    </div>
                    <div id="job-form-content"></div>
                </div>
            </div>
        `;
    }

    getFormHTML(job = {}) {
        return `
            <form class="card grid-card">
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input class="form-control" name="title" type="text" value="${job.title || ''}" placeholder="Введите название задания">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea class="form-control" name="description" rows="4" placeholder="Введите описание">${job.description || ''}</textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Приоритет</label>
                            <input class="form-control" name="priority" type="number" min="1" value="${job.priority || ''}" placeholder="5">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Статус</label>
                            <input class="form-control" name="status" type="text" value="${job.status || ''}" placeholder="pending">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Цена</label>
                            <input class="form-control" name="price" type="number" min="0" value="${job.price || ''}" placeholder="200">
                        </div>
                    </div>
                </div>
            </form>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    renderForm(job = {}) {
        const formRoot = document.getElementById('job-form-content');
        formRoot.innerHTML = this.getFormHTML(job);
        formRoot.querySelector('form').addEventListener('submit', (event) => event.preventDefault());
    }

    getData() {
        const formRoot = document.getElementById('job-form-content');
        formRoot.innerHTML = '<div class="alert alert-secondary">Загрузка задания...</div>';

        ajax.get(jobUrls.getJobById(this.id), (data, status) => {
            if (status < 200 || status >= 300 || !data) {
                formRoot.innerHTML = '<div class="alert alert-danger">Не удалось загрузить задание из API.</div>';
                return;
            }

            this.renderForm(data);
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        if (this.id) {
            this.getData();
            return;
        }

        this.renderForm();
    }
}
