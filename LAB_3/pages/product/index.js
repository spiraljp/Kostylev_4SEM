import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <div id="product-page"></div>
            </div>
        `;
    }

    getNodeData(id) {
        const nodes = {
            1: {
                performance: 95,
                cpu: "Intel Xeon Gold 6248",
                ram: 128,
                storage: 2000,
                load: 45
            },
            2: {
                performance: 72,
                cpu: "AMD EPYC 7302",
                ram: 64,
                storage: 1000,
                load: 78
            },
            3: {
                performance: 45,
                cpu: "Intel Xeon Silver 4214",
                ram: 32,
                storage: 500,
                load: 23
            },
            4: {
                performance: 88,
                cpu: "AMD EPYC 7402",
                ram: 256,
                storage: 4000,
                load: 12
            }
        };
        return nodes[id] || nodes[1];
    }

    getData() {
        const nodeData = this.getNodeData(parseInt(this.id));

        const jobs = {
            1: {
                jobName: "Молекулярное моделирование белков",
                requiredTime: 48,
                priority: "high",
                priorityText: "Высокий",
                cores: 64,
                requiredRAM: 64,
                forecast: "Оптимально, завершится примерно через 42 часа",
                status: "running"
            },
            2: {
                jobName: "Анализ климатических данных",
                requiredTime: 24,
                priority: "medium",
                priorityText: "Средний",
                cores: 32,
                requiredRAM: 32,
                forecast: "Средняя загрузка, возможны задержки",
                status: "pending"
            },
            3: {
                jobName: "Обработка изображений",
                requiredTime: 12,
                priority: "low",
                priorityText: "Низкий",
                cores: 16,
                requiredRAM: 16,
                forecast: "Быстрое выполнение",
                status: "pending"
            },
            4: {
                jobName: "Финансовое моделирование",
                requiredTime: 72,
                priority: "high",
                priorityText: "Высокий",
                cores: 128,
                requiredRAM: 128,
                forecast: "Высокая эффективность",
                status: "running"
            }
        };

        const job = jobs[this.id] || jobs[1];

        return {
            nodeId: this.id,
            ...nodeData,
            ...job
        };
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
