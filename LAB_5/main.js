import { HomePage } from './pages/HomePage.js';
import { JobFormPage } from './pages/JobFormPage.js';

const app = document.querySelector('#app');

function renderRoute() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'home';
    const id = params.get('id');

    if (page === 'edit' || page === 'create') {
        new JobFormPage(app, { mode: page, id }).render();
        return;
    }

    new HomePage(app).render();
}

window.addEventListener('popstate', renderRoute);

export function navigate(query) {
    window.history.pushState({}, '', `${window.location.pathname}?${query}`);
    renderRoute();
}

renderRoute();
