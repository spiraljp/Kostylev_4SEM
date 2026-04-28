import { ProductCardComponent } from "../../components/product-card/index.js";
import { ButtonGroupComponent } from "../../components/button-group/index.js";
import { ProductPage } from "../product/index.js";
import { TasksPage } from "../tasks/index.js";
import nodeStore from "../../store.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentFilter = 'all';
        this.currentStartIndex = 0;    // индекс первого отображаемого узла
        this.visibleCount = 3;          // количество карточек на экране
        this.cardWidth = 320;
        this.gap = 16;
    }

    get filterRoot() {
        return document.getElementById('filter-section');
    }

    get carouselContainer() {
        return document.getElementById('carousel-container');
    }

    getHTML() {
        const containerWidth = this.visibleCount * (this.cardWidth + this.gap) - this.gap;
        return `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Grid-система: Планирование заданий</h1>
                <p class="text-center lead">Выберите вычислительный узел для выполнения ваших расчётов</p>
                <div class="d-flex justify-content-center gap-2 mb-3">
                    <button id="tasks-button" class="btn" style="background-color: #6e7a8a; color: white;">Домашка</button>
                    <button id="add-node-btn" class="btn" style="background-color: #5a6e7a; color: white;">+ Добавить вычислительный узел</button>
                </div>
                <div id="filter-section" class="d-flex justify-content-center"></div>

                <div class="carousel-wrapper" style="display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 20px;">
                    <button id="carousel-prev" class="btn" style="background-color: #5a6e7a; color: white; font-size: 24px;">‹</button>
                    <div id="carousel-container" style="display: flex; gap: ${this.gap}px; width: ${containerWidth}px; overflow: hidden; margin: 0 auto;">
                        <!-- сюда динамически будут вставляться карточки -->
                    </div>
                    <button id="carousel-next" class="btn" style="background-color: #5a6e7a; color: white; font-size: 24px;">›</button>
                </div>
            </div>
        `;
    }

    getFilteredNodes() {
        const allNodes = nodeStore.getNodes();
        if (this.currentFilter === 'all') return allNodes;
        return allNodes.filter(node => node.performanceLevel === this.currentFilter);
    }

    // Отрисовать видимые карточки на основе текущего индекса
    renderVisibleCards() {
        const container = this.carouselContainer;
        if (!container) return;
        container.innerHTML = '';
        const filtered = this.getFilteredNodes();
        if (filtered.length === 0) {
            container.innerHTML = '<div class="alert alert-warning">Нет узлов</div>';
            return;
        }
        // Корректируем startIndex, чтобы он был в пределах [0, length-1]
        const len = filtered.length;
        let start = this.currentStartIndex % len;
        if (start < 0) start += len;
        // Показываем visibleCount карточек, циклически
        for (let i = 0; i < this.visibleCount; i++) {
            const idx = (start + i) % len;
            const node = filtered[idx];
            const cardWrapper = document.createElement('div');
            cardWrapper.style.width = `${this.cardWidth}px`;
            cardWrapper.style.flexShrink = '0';
            container.appendChild(cardWrapper);
            const card = new ProductCardComponent(cardWrapper);
            card.render(node, this.clickCard.bind(this));
        }
    }

    nextSlide() {
        const filtered = this.getFilteredNodes();
        if (filtered.length === 0) return;
        this.currentStartIndex = (this.currentStartIndex + 1) % filtered.length;
        this.renderVisibleCards();
    }

    prevSlide() {
        const filtered = this.getFilteredNodes();
        if (filtered.length === 0) return;
        this.currentStartIndex = (this.currentStartIndex - 1 + filtered.length) % filtered.length;
        this.renderVisibleCards();
    }

    generateNewNode() {
        const newId = nodeStore.getNextId();
        const performance = Math.floor(Math.random() * 100) + 1;
        let performanceLevel = 'low';
        if (performance >= 80) performanceLevel = 'high';
        else if (performance >= 50) performanceLevel = 'medium';
        const cpus = [
            "Intel Xeon Gold 6248", "AMD EPYC 7302",
            "Intel Xeon Silver 4214", "AMD EPYC 7402",
            "Intel Xeon Platinum 8280", "AMD EPYC 7742"
        ];
        return {
            id: newId,
            performance,
            performanceLevel,
            cpu: cpus[Math.floor(Math.random() * cpus.length)],
            ram: Math.floor(Math.random() * 200) + 16,
            storage: Math.floor(Math.random() * 4000) + 500,
            load: Math.floor(Math.random() * 100),
            available: Math.random() > 0.3
        };
    }

    addNewNode() {
        const newNode = this.generateNewNode();
        nodeStore.addNode(newNode);
        // после добавления новых узлов перерисовываем карусель, индекс оставляем тот же (или сбрасываем на 0)
        // но лучше оставить текущий startIndex, но он может стать некорректным, если массив изменился - скорректируем
        const filtered = this.getFilteredNodes();
        if (filtered.length === 0) return;
        if (this.currentStartIndex >= filtered.length) this.currentStartIndex = filtered.length - 1;
        this.renderVisibleCards();
    }

    handleFilterClick(e) {
        const filter = e.target.dataset.filter;
        if (filter) {
            this.currentFilter = filter;
            this.currentStartIndex = 0;
            this.renderVisibleCards();
        }
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    goToTasks() {
        const tasksPage = new TasksPage(this.parent);
        tasksPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const buttonGroup = new ButtonGroupComponent(this.filterRoot);
        buttonGroup.render(this.handleFilterClick.bind(this));

        this.renderVisibleCards();

        document.getElementById('tasks-button')?.addEventListener('click', this.goToTasks.bind(this));
        document.getElementById('add-node-btn')?.addEventListener('click', this.addNewNode.bind(this));
        document.getElementById('carousel-prev')?.addEventListener('click', this.prevSlide.bind(this));
        document.getElementById('carousel-next')?.addEventListener('click', this.nextSlide.bind(this));
    }
}
