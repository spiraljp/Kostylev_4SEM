import { navigate } from '../main.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';
import { JobFormComponent } from '../components/JobFormComponent.js';
import { ajax } from '../modules/ajax.js';
import { jobUrls } from '../modules/jobUrls.js';

export class JobFormPage {
    constructor(parent, { mode, id }) {
        this.parent = parent;
        this.mode = mode;
        this.id = id;
        this.formRoot = null;
    }

    getHTML() {
        const title = this.mode === 'edit' ? 'Редактирование задания' : 'Добавление задания';
        const subtitle = this.mode === 'edit'
            ? 'Поля заполнены данными выбранного задания.'
            : 'Поля доступны для ввода, сохранение появится в следующей лабораторной.';

        return `
            <section class="page">
                <div class="header">
                    <div>
                        <h1 class="header__title">${title}</h1>
                        <p class="header__subtitle">${subtitle}</p>
                    </div>
                    <div class="form__actions" data-actions></div>
                </div>
                <div data-form></div>
            </section>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.formRoot = this.parent.querySelector('[data-form]');

        new BackButtonComponent(this.parent.querySelector('[data-actions]')).render(() => {
            navigate('');
        });

        if (this.mode === 'edit' && this.id) {
            this.getData();
            return;
        }

        new JobFormComponent(this.formRoot).render();
    }

    getData() {
        this.formRoot.innerHTML = '<div class="state">Загрузка задания...</div>';

        ajax.get(jobUrls.getJobById(this.id), (data, status) => {
            this.formRoot.innerHTML = '';

            if (status < 200 || status >= 300 || !data) {
                this.formRoot.innerHTML = '<div class="state">Задание не найдено или API недоступен.</div>';
                return;
            }

            new JobFormComponent(this.formRoot).render(data);
        });
    }
}
