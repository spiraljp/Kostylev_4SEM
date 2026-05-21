import { ThreeViewer } from '../../components/three-viewer/index.js';

export class TasksPage {
    constructor(parent) {
        this.parent = parent;
        this.diagonalSumResult = null;
        this.anagramGroupsResult = null;
        this.threeViewer = null;
    }

    getHTML() {
        return `
            <div class="container mt-4">
                <h1 class="text-center mb-4">Домашка</h1>
                <button id="back-to-main" class="btn btn-secondary mb-4">← На главную</button>

                <div class="card mb-4">
                    <div class="card-header">
                        <h3>2.7 Сумма диагоналей матрицы</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Матрица загрузки вычислительных узлов (performanceLoadMatrix):</strong></p>
                        <pre id="matrix-display"></pre>
                        <button id="calc-diagonal" class="btn btn-primary">Рассчитать общую загрузку по диагоналям</button>
                        <div id="diagonal-result" class="mt-3"></div>
                    </div>
                </div>

                <div class="card mb-4">
                    <div class="card-header">
                        <h3>3.5 Группировка анаграмм</h3>
                    </div>
                    <div class="card-body">
                        <p><strong>Массив имён заданий (jobNames):</strong></p>
                        <pre id="words-display"></pre>
                        <button id="group-anagrams" class="btn btn-primary">Сгруппировать задания-анаграммы</button>
                        <div id="anagram-result" class="mt-3"></div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3>3D-модель вычислительного узла</h3>
                    </div>
                    <div class="card-body">
                        <div id="three-container" style="width:100%; height:400px; background:#1a1a2e; border-radius:8px;"></div>
                        <p class="text-muted small mt-2"> Мышь: вращение | Правая кнопка: панорама | Колёсико: масштаб</p>
                    </div>
                </div>
            </div>
        `;
    }

    calculateDiagonalSum(performanceLoadMatrix) {
        if (!performanceLoadMatrix.length || !performanceLoadMatrix[0].length) return 0;
        const n = performanceLoadMatrix.length;
        let totalDiagonalLoad = 0;
        let i = 0;
        do {
            totalDiagonalLoad += performanceLoadMatrix[i][i];
            totalDiagonalLoad += performanceLoadMatrix[i][n - 1 - i];
            i++;
        } while (i < n);
        if (n % 2 === 1) {
            const mid = Math.floor(n / 2);
            totalDiagonalLoad -= performanceLoadMatrix[mid][mid];
        }
        return totalDiagonalLoad;
    }

    groupJobAnagrams(jobNames) {
        const anagramMap = new Map();
        for (const job of jobNames) {
            const sortedKey = job.toLowerCase().split('').sort().join('');
            if (!anagramMap.has(sortedKey)) {
                anagramMap.set(sortedKey, []);
            }
            anagramMap.get(sortedKey).push(job);
        }
        let groups = Array.from(anagramMap.values()).filter(group => group.length > 1);
        groups = groups.map(group => group.sort());
        groups.sort((a, b) => a[0].localeCompare(b[0]));
        return groups;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const performanceLoadMatrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        const jobNames = [
            "кресло", "лесорк", "стол", "слот", "диван", "навид", "товар", "равот"
        ];

        const matrixString = performanceLoadMatrix.map(row => `[${row.join(', ')}]`).join(', ');
        document.getElementById('matrix-display').textContent = `[${matrixString}]`;
        document.getElementById('words-display').textContent = JSON.stringify(jobNames, null, 2);

        document.getElementById('calc-diagonal').addEventListener('click', () => {
            const totalLoad = this.calculateDiagonalSum(performanceLoadMatrix);
            const resultDiv = document.getElementById('diagonal-result');
            resultDiv.innerHTML = `<div class="alert alert-success">Общая загрузка по диагоналям матрицы = ${totalLoad}</div>`;
        });

        document.getElementById('group-anagrams').addEventListener('click', () => {
            const anagramGroups = this.groupJobAnagrams(jobNames);
            const resultDiv = document.getElementById('anagram-result');
            if (anagramGroups.length === 0) {
                resultDiv.innerHTML = `<div class="alert alert-info">Нет групп заданий-анаграмм из двух и более элементов</div>`;
            } else {
                const compactGroups = anagramGroups.map(group => `[${group.join(', ')}]`).join(', ');
                resultDiv.innerHTML = `<div class="alert alert-success">Группы заданий-анаграмм:<br><pre>[${compactGroups}]</pre></div>`;
            }
        });

        const threeContainer = document.getElementById('three-container');
        if (threeContainer) {
            this.threeViewer = new ThreeViewer(threeContainer, 'models/server.glb');
            window.addEventListener('resize', () => this.threeViewer?.resize());
        }

        document.getElementById('back-to-main').addEventListener('click', () => {
            if (this.threeViewer) {
                this.threeViewer.dispose();
                this.threeViewer = null;
            }
            import('../main/index.js').then(module => {
                const MainPage = module.MainPage;
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            }).catch(() => {
                window.location.reload();
            });
        });
    }
}
