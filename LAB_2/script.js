window.onload = function() {

let expression = ''; // Строка выражения
let lastResult = null;

function roundResult(value) {
    if (typeof value !== 'number') return value;
    if (isNaN(value) || !isFinite(value)) return value;
    return parseFloat(value.toFixed(8));
}

const outputElement = document.getElementById("result");

function updateDisplay(value) {
    if (value === '' || value === undefined) {
        outputElement.innerHTML = '0';
    } else {
        let displayValue = value;
        if (typeof value === 'string' && !isNaN(parseFloat(value)) && isFinite(parseFloat(value))) {
            const num = parseFloat(value);
            displayValue = roundResult(num).toString();
        }
        outputElement.innerHTML = displayValue;
    }
}


function evaluateExpression(expr) {
    try {

        let processedExpr = expr.replace(/x/g, '*');

        processedExpr = processedExpr.replace(/÷/g, '/');

        if (!processedExpr || processedExpr.trim() === '') {
            return null;
        }

        const result = new Function('return ' + processedExpr)();

        if (!isFinite(result) || isNaN(result)) {
            return null;
        }


        return roundResult(result);
    } catch (e) {
        console.log('Ошибка вычисления:', e);
        return null;
    }
}


function canAddOperator(op) {
    if (expression.length === 0) return false;
    const lastChar = expression[expression.length - 1];
    return !['+', '-', 'x', '/', '*', '(', '.', '^'].includes(lastChar);
}


function canAddDot() {
    if (expression.length === 0) return true;
    const lastNumberMatch = expression.match(/[\d\.]+(?![\(\)\+\-\x\/\*])[^\(\)\+\-\x\/\*]*$/);
    if (!lastNumberMatch) return true;
    const lastNumber = lastNumberMatch[0];
    return !lastNumber.includes('.');
}


function addDigit(value) {
    if (lastResult !== null && expression === '') {
        expression = '';
        lastResult = null;
    }

    expression += value;
    updateDisplay(expression);
}


function addOperator(op) {
    if (!canAddOperator(op)) return;


    if (lastResult !== null && expression === '') {
        expression = lastResult.toString();
        lastResult = null;
    }

    expression += op;
    updateDisplay(expression);
}


let openBracketsCount = 0;

function addBracket(bracketType) {
    if (lastResult !== null && expression === '') {
        expression = '';
        lastResult = null;
    }

    if (bracketType === '(') {
        if (expression.length > 0) {
            const lastChar = expression[expression.length - 1];
            if (lastChar.match(/[\d\.]/)) {
                expression += 'x';
            }
        }
        expression += '(';
        openBracketsCount++;
        updateDisplay(expression);
    }
    else if (bracketType === ')') {
        if (openBracketsCount === 0) {
            updateDisplay('Ошибка');
            return;
        }


        if (expression.length > 0) {
            const lastChar = expression[expression.length - 1];
            if (['+', '-', 'x', '/', '*', '('].includes(lastChar)) {
                updateDisplay('Ошибка');
                return;
            }
        }

        expression += ')';
        openBracketsCount--;
        updateDisplay(expression);
    }
}


const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML;
        addDigit(digitValue);
    }
});


document.getElementById("btn_digit_000").onclick = function() {
    addDigit('000');
};


document.getElementById("btn_digit_dot").onclick = function() {
    if (canAddDot()) {
        addDigit('.');
    }
};


document.getElementById("btn_op_backspace").onclick = function() {
    if (expression.length > 0) {
        const lastChar = expression[expression.length - 1];
        if (lastChar === '(') {
            openBracketsCount--;
        } else if (lastChar === ')') {
            openBracketsCount++;
        }
        expression = expression.slice(0, -1);
        updateDisplay(expression || '0');
    }
};


document.getElementById("btn_op_mult").onclick = function() {
    addOperator('x');
};
document.getElementById("btn_op_plus").onclick = function() {
    addOperator('+');
};
document.getElementById("btn_op_minus").onclick = function() {
    addOperator('-');
};
document.getElementById("btn_op_div").onclick = function() {
    addOperator('/');
};


document.getElementById("btn_op_sign").onclick = function() {
    if (expression.length === 0) return;


    const match = expression.match(/(\d+(?:\.\d+)?)(?![\(\)\+\-\x\/\*])[^\(\)\+\-\x\/\*]*$/);
    if (match) {
        const lastNumber = match[1];
        const lastNumberIndex = expression.lastIndexOf(lastNumber);
        const newNumber = roundResult(parseFloat(lastNumber) * -1).toString();
        expression = expression.substring(0, lastNumberIndex) + newNumber + expression.substring(lastNumberIndex + lastNumber.length);
        updateDisplay(expression);
    }
};

document.getElementById("btn_op_percent").onclick = function() {
    if (expression.length === 0) return;
    const match = expression.match(/(\d+(?:\.\d+)?)(?![\(\)\+\-\x\/\*])[^\(\)\+\-\x\/\*]*$/);
    if (match) {
        const lastNumber = match[1];
        const lastNumberIndex = expression.lastIndexOf(lastNumber);
        let percentValue = parseFloat(lastNumber) / 100;
        percentValue = roundResult(percentValue);
        const newNumber = percentValue.toString();
        expression = expression.substring(0, lastNumberIndex) + newNumber + expression.substring(lastNumberIndex + lastNumber.length);
        updateDisplay(expression);
    } else {
        return;
    }
};

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
        } else if (lastNumber > 170) {
            updateDisplay('Ошибка');
        } else {
            updateDisplay('Ошибка');
        }
    }
};


document.getElementById("btn_op_clear").onclick = function() {
    expression = '';
    openBracketsCount = 0;
    lastResult = null;
    updateDisplay('0');
};


document.getElementById("btn_op_equal").onclick = function() {
    if (expression.length === 0) {
        if (lastResult !== null) {
            updateDisplay(lastResult.toString());
        }
        return;
    }


    if (openBracketsCount !== 0) {
        updateDisplay('Ошибка');
        return;
    }


    const lastChar = expression[expression.length - 1];
    if (['+', '-', 'x', '/', '*', '('].includes(lastChar)) {
        updateDisplay('Ошибка');
        return;
    }

    const result = evaluateExpression(expression);

    if (result === null) {
        updateDisplay('Ошибка');
        return;
    }

    lastResult = result;
    expression = lastResult.toString();
    openBracketsCount = 0;
    updateDisplay(expression);
};


document.getElementById("btn_op_bracket_open").onclick = function() {
    addBracket('(');
};

document.getElementById("btn_op_bracket_close").onclick = function() {
    addBracket(')');
};

const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = function() {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
        themeToggle.textContent = '☀️ Светлая';
    } else {
        themeToggle.textContent = '🌙 Тёмная';
    }
};

};
