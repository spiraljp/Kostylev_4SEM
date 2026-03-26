window.onload = function() {

let a = '';
let b = '';
let expressionResult = '';
let selectedOperation = null;
let lastResult = 0; // Для накапливаемых операций
let accumulator = 0; // Для M+ и M-


const outputElement = document.getElementById("result");
const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');


function updateDisplay(value) {
    outputElement.innerHTML = value || '0';
}


function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit;
        }
        updateDisplay(a);
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
            b += digit;
            updateDisplay(b);
        }
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
        a += '000';
        updateDisplay(a);
    } else {
        b += '000';
        updateDisplay(b);
    }
};


document.getElementById("btn_op_backspace").onclick = function() {
    if (!selectedOperation && a.length > 0) {
        a = a.slice(0, -1);
        updateDisplay(a || '0');
    } else if (selectedOperation && b.length > 0) {
        b = b.slice(0, -1);
        updateDisplay(b || '0');
    }
};


document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return;
    selectedOperation = 'x';
};
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return;
    selectedOperation = '+';
};
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return;
    selectedOperation = '-';
};
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return;
    selectedOperation = '/';
};


document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = (Number(a) * -1).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        b = (Number(b) * -1).toString();
        updateDisplay(b);
    }
};


document.getElementById("btn_op_percent").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = (Number(a) / 100).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        b = (Number(b) / 100).toString();
        updateDisplay(b);
    }
};


document.getElementById("btn_op_sqrt").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = Math.sqrt(Number(a)).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        b = Math.sqrt(Number(b)).toString();
        updateDisplay(b);
    }
};


document.getElementById("btn_op_square").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = (Number(a) * Number(a)).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        b = (Number(b) * Number(b)).toString();
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
        a = factorial(Number(a)).toString();
        updateDisplay(a);
    } else if (selectedOperation && b !== '') {
        b = factorial(Number(b)).toString();
        updateDisplay(b);
    }
};


document.getElementById("btn_op_clear").onclick = function() {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    accumulator = 0;
    updateDisplay('0');
};


document.getElementById("btn_change_color").onclick = function() {
    const colors = document.body.classList.contains('light-theme')
        ? ['#f5f9ff', '#e8f4f8', '#f0f0fa', '#faf0e6', '#f0f5e8']
        : ['#0a0f1e', '#1e3a3a', '#2d1b3a', '#3a2b1b', '#1e2b3a'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
};


document.getElementById("btn_change_result_color").onclick = function() {
    const colors = document.body.classList.contains('light-theme')
        ? ['#0b5e5e', '#8a4f2c', '#4a2c8a', '#8a2c4a', '#2c6b8a']
        : ['#6df0a0', '#f0a06d', '#a06df0', '#f06d6d', '#6dd0f0'];
    outputElement.style.color = colors[Math.floor(Math.random() * colors.length)];
};


document.getElementById("btn_accum_plus").onclick = function() {
    if (a !== '') {
        accumulator += Number(a);
        alert(`Аккумулятор M+ = ${accumulator}`);
    }
};


document.getElementById("btn_accum_minus").onclick = function() {
    if (a !== '') {
        accumulator -= Number(a);
        alert(`Аккумулятор M- = ${accumulator}`);
    }
};


document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
        return;

    switch(selectedOperation) {
        case 'x':
            expressionResult = Number(a) * Number(b);
            break;
        case '+':
            expressionResult = Number(a) + Number(b);
            break;
        case '-':
            expressionResult = Number(a) - Number(b);
            break;
        case '/':
            expressionResult = Number(a) / Number(b);
            break;
        default:
            break;
    }

    a = expressionResult.toString();
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
