window.onload = function() {

let a = '';
let b = '';
let expressionResult = '';
let selectedOperation = null;


const outputElement = document.getElementById("result");
const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');


function updateDisplay(value) {
    outputElement.innerHTML = value || '0';
}


function onDigitButtonClicked(digit) {
    if (!selectedOperation) {

        if (digit === '0' && a === '0') {
            return;
        }
        if (digit === '0' && a === '') {
            a = '0';
            updateDisplay(a);
            return;
        }
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit;

            if (a.startsWith('0') && a.length > 1 && !a.startsWith('0.')) {
                a = a.replace(/^0+/, '');
                if (a === '' || a === '.') a = '0';
            }
        }
        updateDisplay(a);
    } else {
        if (digit === '0' && b === '0') {
            return;
        }
        if (digit === '0' && b === '') {
            b = '0';
            updateDisplay(b);
            return;
        }
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
            b += digit;
            if (b.startsWith('0') && b.length > 1 && !b.startsWith('0.')) {
                b = b.replace(/^0+/, '');
                if (b === '' || b === '.') b = '0';
            }
        }
        updateDisplay(b);
    }
}

digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML;
        onDigitButtonClicked(digitValue);
    }
});

document.getElementById("btn_digit_000").onclick = function() {
    if (!selectedOperation) {
        if (a === '' || a === '0') {
            a = '0';
            updateDisplay(a);
            return;
        }
        a += '000';
        updateDisplay(a);
    } else {
        if (b === '' || b === '0') {
            b = '0';
            updateDisplay(b);
            return;
        }
        b += '000';
        updateDisplay(b);
    }
};


document.getElementById("btn_op_backspace").onclick = function() {
    if (!selectedOperation && a.length > 0) {
        a = a.slice(0, -1);
        if (a === '' || a === '-') a = '0';
        updateDisplay(a);
    } else if (selectedOperation && b.length > 0) {
        b = b.slice(0, -1);
        if (b === '' || b === '-') b = '0';
        updateDisplay(b);
    }
};


document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return;
    if (a !== '0') {
        a = a.replace(/^0+/, '');
        if (a === '' || a === '.') a = '0';
    }
    selectedOperation = 'x';
};
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return;
    if (a !== '0') {
        a = a.replace(/^0+/, '');
        if (a === '' || a === '.') a = '0';
    }
    selectedOperation = '+';
};
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return;
    if (a !== '0') {
        a = a.replace(/^0+/, '');
        if (a === '' || a === '.') a = '0';
    }
    selectedOperation = '-';
};
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return;
    if (a !== '0') {
        a = a.replace(/^0+/, '');
        if (a === '' || a === '.') a = '0';
    }
    selectedOperation = '/';
};


document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation && a !== '') {
        let num = Number(a);
        a = (num * -1).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        let num = Number(b);
        b = (num * -1).toString();
        updateDisplay(b);
    }
};


document.getElementById("btn_op_percent").onclick = function() {
    if (!selectedOperation && a !== '') {
        let num = parseFloat(a);
        let result = num / 100;
        a = parseFloat(result.toFixed(15)).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        let num = parseFloat(b);
        let result = num / 100;
        b = parseFloat(result.toFixed(15)).toString();
        updateDisplay(b);
    }
};


document.getElementById("btn_op_sqrt").onclick = function() {
    if (!selectedOperation && a !== '') {
        let num = Number(a);
        if (num >= 0) {
            a = Math.sqrt(num).toString();
            updateDisplay(a);
        } else {
            updateDisplay('Ошибка');
            setTimeout(() => {
                updateDisplay(a);
            }, 1000);
        }
    } else if (selectedOperation && b !== '') {
        let num = Number(b);
        if (num >= 0) {
            b = Math.sqrt(num).toString();
            updateDisplay(b);
        } else {
            updateDisplay('Ошибка');
            setTimeout(() => {
                updateDisplay(b);
            }, 1000);
        }
    }
};


document.getElementById("btn_op_square").onclick = function() {
    if (!selectedOperation && a !== '') {
        let num = Number(a);
        a = (num * num).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        let num = Number(b);
        b = (num * num).toString();
        updateDisplay(b);
    }
};


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
    if (!selectedOperation && a !== '') {
        let num = Number(a);
        if (num >= 0 && Number.isInteger(num)) {
            a = factorial(num).toString();
            updateDisplay(a);
        } else {
            updateDisplay('Ошибка');
            setTimeout(() => {
                updateDisplay(a);
            }, 1000);
        }
    } else if (selectedOperation && b !== '') {
        let num = Number(b);
        if (num >= 0 && Number.isInteger(num)) {
            b = factorial(num).toString();
            updateDisplay(b);
        } else {
            updateDisplay('Ошибка');
            setTimeout(() => {
                updateDisplay(b);
            }, 1000);
        }
    }
};


document.getElementById("btn_op_clear").onclick = function() {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    updateDisplay('0');
};


document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
        return;

    let numA = Number(a);
    let numB = Number(b);

    switch(selectedOperation) {
        case 'x':
            expressionResult = numA * numB;
            break;
        case '+':
            expressionResult = numA + numB;
            break;
        case '-':
            expressionResult = numA - numB;
            break;
        case '/':
            if (numB === 0) {
                updateDisplay('Ошибка');
                setTimeout(() => {
                    updateDisplay(a);
                }, 1000);
                return;
            }
            expressionResult = numA / numB;
            break;
        default:
            break;
    }

    if (typeof expressionResult === 'number') {
        if (Number.isInteger(expressionResult)) {
            a = expressionResult.toString();
        } else {
            a = parseFloat(expressionResult.toFixed(10)).toString();
        }
    } else {
        a = expressionResult.toString();
    }

    lastResult = expressionResult;
    b = '';
    selectedOperation = null;
    updateDisplay(a);
};


const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = function() {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        themeToggle.textContent = '☀️ Светлая';
        document.body.style.backgroundColor = '';
        outputElement.style.color = '';
    } else {
        themeToggle.textContent = '🌙 Тёмная';
        document.body.style.backgroundColor = '';
        outputElement.style.color = '';
    }
};
};
