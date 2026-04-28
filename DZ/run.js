const readline = require('readline');
const { sumOfSquares, isEqualObj, diagonalSum, groupAnagrams } = require('./tasks');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function parseJSON(input, typeHint) {
    try {
        const parsed = JSON.parse(input);
        if (typeHint === 'array' && !Array.isArray(parsed)) throw new Error();
        if (typeHint === 'object' && (typeof parsed !== 'object' || parsed === null)) throw new Error();
        return parsed;
    } catch {
        console.log('Ошибка ввода: неверный формат');
        return null;
    }
}

function prompt(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function runSumOfSquares() {
    console.log('--- Сумма квадратов ---');
    const input = await prompt('Массив чисел (JSON): ');
    const arr = parseJSON(input, 'array');
    if (arr === null) return;
    console.log(`Результат: ${sumOfSquares(arr)}\n`);
}

async function runIsEqualObj() {
    console.log('--- Сравнение объектов ---');
    const input1 = await prompt('Первый объект (JSON): ');
    const obj1 = parseJSON(input1, 'object');
    if (obj1 === null) return;
    const input2 = await prompt('Второй объект (JSON): ');
    const obj2 = parseJSON(input2, 'object');
    if (obj2 === null) return;
    const equal = isEqualObj(obj1, obj2);
    console.log(`Объекты ${equal ? 'идентичны' : 'не идентичны'}\n`);
}

async function runDiagonalSum() {
    console.log('--- Сумма диагоналей матрицы ---');
    const input = await prompt('Матрица (JSON): ');
    const matrix = parseJSON(input, 'array');
    if (matrix === null) return;
    console.log(`Сумма диагоналей: ${diagonalSum(matrix)}\n`);
}

async function runGroupAnagrams() {
    console.log('--- Группировка анаграмм ---');
    const input = await prompt('Массив слов (JSON): ');
    const words = parseJSON(input, 'array');
    if (words === null) return;
    const groups = groupAnagrams(words);
    if (groups.length === 0) {
        console.log('Групп из двух и более анаграмм нет.\n');
    } else {
        console.log('Группы анаграмм:');
        groups.forEach((g, i) => console.log(`  ${i+1}. [${g.join(', ')}]`));
        console.log('');
    }
}

async function main() {
    while (true) {
        console.log('1. Сумма квадратов (1.3)');
        console.log('2. Сравнение объектов (1.7)');
        console.log('3. Сумма диагоналей матрицы (2.7)');
        console.log('4. Группировка анаграмм (3.5)');
        console.log('0. Выход');
        const choice = (await prompt('Выбор: ')).trim();
        if (choice === '0') break;
        switch (choice) {
            case '1': await runSumOfSquares(); break;
            case '2': await runIsEqualObj(); break;
            case '3': await runDiagonalSum(); break;
            case '4': await runGroupAnagrams(); break;
            default: console.log('Неверный ввод\n');
        }
        await prompt('Нажмите Enter для продолжения...');
    }
    rl.close();
}

main();
