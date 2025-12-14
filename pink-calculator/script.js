const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentOperand = '0';
let previousOperand = null;
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentOperand;
}

function clearCalculator() {
    currentOperand = '0';
    previousOperand = null;
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentOperand = number;
        shouldResetDisplay = false;
    } else if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else if (number === '.' && currentOperand.includes('.')) {
        return; // Prevent multiple decimals
    } else {
        currentOperand += number;
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== null && !shouldResetDisplay) {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    shouldResetDisplay = true;
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = null;
    previousOperand = null;
    shouldResetDisplay = true;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.textContent);
        } else if (button.classList.contains('decimal')) {
            appendNumber('.');
        } else if (button.classList.contains('operator')) {
            chooseOperation(button.dataset.action);
        } else if (button.classList.contains('equals')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clearCalculator();
        }
    });
});

// Initialize display
updateDisplay();
