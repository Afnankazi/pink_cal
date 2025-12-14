document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false; // Flag to clear display after an operation or equals

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function appendNumber(number) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
    }

    function appendDecimal() {
        if (shouldResetDisplay) {
            currentInput = '0.';
            shouldResetDisplay = false;
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '' && !shouldResetDisplay) {
            compute();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = ''; // Clear current input for the next number
        shouldResetDisplay = true; // Next number input will clear the display
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    currentInput = 'Error';
                    previousInput = '';
                    operation = null;
                    shouldResetDisplay = true;
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        currentInput = computation.toString();
        operation = null;
        previousInput = '';
        shouldResetDisplay = true; // Ready for new input or new operation chain
    }

    function clear() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        shouldResetDisplay = false;
    }

    function negateNumber() {
        if (currentInput === '0' && previousInput === '' && operation === null) return; // Don't negate initial 0 unless it's part of an ongoing calculation
        currentInput = (parseFloat(currentInput) * -1).toString();
    }

    function percentage() {
        if (currentInput === '0') return;
        currentInput = (parseFloat(currentInput) / 100).toString();
    }


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;
            const action = button.dataset.action;

            if (button.classList.contains('number') && !button.classList.contains('decimal')) {
                appendNumber(buttonText);
                updateDisplay();
            } else if (button.classList.contains('decimal')) {
                appendDecimal();
                updateDisplay();
            } else if (button.classList.contains('operator')) {
                if (action === 'divide' || action === 'multiply' || action === 'subtract' || action === 'add') {
                    chooseOperation(buttonText);
                    updateDisplay(); 
                } else if (action === 'negate') {
                    negateNumber();
                    updateDisplay();
                } else if (action === 'percent') {
                    percentage();
                    updateDisplay();
                }
            } else if (action === 'clear') {
                clear();
                updateDisplay();
            } else if (action === 'equals') {
                compute();
                updateDisplay();
            }
        });
    });

    // Initial display update
    updateDisplay();
});
