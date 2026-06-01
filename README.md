# Лабораторная работа №2. Калькулятор на JavaScript

## Постановка задачи

Цель работы — добавить JavaScript-логику в калькулятор и реализовать индивидуальную операцию по теме работы.

Индивидуальная тема: **Grid-система планирования заданий**.

## Выполнение

В калькулятор добавлена обработка нажатий на кнопки. Реализованы ввод чисел, арифметические операции, скобки, очистка, удаление последнего символа, смена знака, проценты, округление результата и вычисление выражения через кнопку `=`.

Основная логика вынесена в `script.js`. Выражение хранится в переменной `expression`, а результат выводится в элемент `#result`.

Также добавлены дополнительные операции: извлечение квадратного корня, возведение числа в квадрат и вычисление факториала.

### Реализация дополнительных операций

Кнопка извлечения квадратного корня получает последнее введенное число, проверяет, что оно неотрицательное, заменяет его на результат `Math.sqrt()` и обновляет экран калькулятора.

    document.getElementById("btn_op_sqrt").onclick = function() {
        if (expression.length === 0) return;

        const match = expression.match(/(\d+(?:\.\d+)?)(?![\(\)\+\-\x\/\*])[^\(\)\+\-\x\/\*]*$/);
        if (match) {
            const lastNumber = parseFloat(match[1]);
            if (lastNumber >= 0) {
                const newNumber = roundResult(Math.sqrt(lastNumber)).toString();
                const lastNumberIndex = expression.lastIndexOf(match[1]);
                expression = expression.substring(0, lastNumberIndex) + newNumber + expression.substring(lastNumberIndex + match[1].length);
                updateDisplay(expression);
            } else {
                updateDisplay('Ошибка');
            }
        }
    };

Кнопка возведения в квадрат также работает с последним числом в выражении и заменяет его на произведение числа самого на себя.

    document.getElementById("btn_op_square").onclick = function() {
        if (expression.length === 0) return;

        const match = expression.match(/(\d+(?:\.\d+)?)(?![\(\)\+\-\x\/\*])[^\(\)\+\-\x\/\*]*$/);
        if (match) {
            const lastNumber = parseFloat(match[1]);
            const newNumber = roundResult(lastNumber * lastNumber).toString();
            const lastNumberIndex = expression.lastIndexOf(match[1]);
            expression = expression.substring(0, lastNumberIndex) + newNumber + expression.substring(lastNumberIndex + match[1].length);
            updateDisplay(expression);
        }
    };

Для вычисления факториала реализована отдельная функция `factorial(n)`. Операция применяется только к целым неотрицательным числам, а слишком большие значения ограничены, чтобы избежать переполнения.

    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    document.getElementById("btn_op_fact").onclick = function() {
        if (expression.length === 0) return;

        const match = expression.match(/(\d+(?:\.\d+)?)(?![\(\)\+\-\x\/\*])[^\(\)\+\-\x\/\*]*$/);
        if (match) {
            const lastNumber = parseFloat(match[1]);
            if (Number.isInteger(lastNumber) && lastNumber >= 0 && lastNumber <= 170) {
                const newNumber = roundResult(factorial(lastNumber)).toString();
                const lastNumberIndex = expression.lastIndexOf(match[1]);
                expression = expression.substring(0, lastNumberIndex) + newNumber + expression.substring(lastNumberIndex + match[1].length);
                updateDisplay(expression);
            } else {
                updateDisplay('Ошибка');
            }
        }
    };

## Результат

Интерфейс калькулятора:

<img width="963" height="1031" alt="image" src="https://github.com/user-attachments/assets/2a217849-cc65-4197-9c0c-0d6b288d9c6c" />

Пример работы индивидуальных операций: добавлены кнопки возведения в квадрат, вычисления факториала и извлечения квадратного корня.

<img width="457" height="602" alt="image" src="https://github.com/user-attachments/assets/7d29f775-d8ed-422b-8e1e-d8618e7b362e" />

<img width="396" height="614" alt="image" src="https://github.com/user-attachments/assets/9e27e9cb-207a-48d1-ac0b-0ce102515ee7" />

<img width="391" height="588" alt="image" src="https://github.com/user-attachments/assets/b3a0a955-7064-4453-81ff-05e9bb6e1b7b" />

<img width="400" height="604" alt="image" src="https://github.com/user-attachments/assets/49fde5dc-9244-44cb-9a95-43cf92f53b1b" />

## Вывод

В ходе работы были изучены обработчики событий, работа с DOM, функции JavaScript и связь HTML-кнопок с программной логикой калькулятора.
