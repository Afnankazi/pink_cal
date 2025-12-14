const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let previousInput = '';
let operator = null;
let awaitingNextOperand = false; // Flag to indicate if the next number should clear the display

function updateDisplay() {
    display.textContent = currentInput;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    awaitingNextOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (awaitingNextOperand) {
        currentInput = number;
        awaitingNextOperand = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (awaitingNextOperand) {
        currentInput = '0.';
        awaitingNextOperand = false;
        updateDisplay();
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function chooseOperator(nextOperator) {
    if (operator && awaitingNextOperand) {
        operator = nextOperator;
        return;
    }

    if (previousInput === '') {
        previousInput = currentInput;
    } else if (currentInput !== '') {
        calculate(); // Calculate if there's a previous operation pending
        previousInput = currentInput; // The result becomes the new previousInput
    }

    operator = nextOperator;
    awaitingNextOperand = true;
    updateDisplay(); // Display should still show previous input or result
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    awaitingNextOperand = true; // After calculation, next number should clear display
    updateDisplay();
}

buttons.addEventListener('click', e => {
    const target = e.target;
    if (!target.matches('button')) return;

    if (target.classList.contains('number')) {
        appendNumber(target.textContent);
    } else if (target.classList.contains('operator')) {
        chooseOperator(target.dataset.operator);
    } else if (target.classList.contains('clear')) {
        clear();
    } else if (target.classList.contains('equals')) {
        calculate();
    } else if (target.dataset.action === 'decimal') {
        appendDecimal();
    }
});

// Initialize display
updateDisplay();
