const display = document.querySelector('.display');
const calculatorButtons = document.querySelector('.buttons');
const calculator ={
    displayValue: '0',
    firstValue: null,
    operator: null,
    isWaitingForSecondValue: false,
}

function updateDisplay() {
    display.value = calculator.displayValue;
}

updateDisplay();

calculatorButtons.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('number')) {
        const digit = target.textContent;
        if (digit === '.') {
            if (!calculator.displayValue.includes('.')) {
                calculator.displayValue += '.';
            } else {
                if (calculator.displayValue === '0') {
                    calculator.displayValue = digit;
                } else {
                    calculator.displayValue += digit;
                }
            }
            updateDisplay();
            return;
        }
        if (calculator.isWaitingForSecondValue) {
            calculator.displayValue = digit;
            calculator.isWaitingForSecondValue = false;
        } else {
            if (calculator.displayValue.length >= 16) return;
            calculator.displayValue = calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
        }
    }
    if (target.classList.contains('operator')) {
        const { displayValue, firstValue, operator } = calculator;
        if (firstValue && operator && !calculator.isWaitingForSecondValue) {
            const result = operate(firstValue, operator, displayValue);
            calculator.displayValue = result;
            calculator.firstValue = result;
        } else {
            calculator.firstValue = calculator.displayValue;
        }
        calculator.operator = target.textContent.trim();
        calculator.isWaitingForSecondValue = true;
        console.log('B')
    }
    if (target.classList.contains('equals')) {
        const { displayValue, firstValue, operator } = calculator;
        if (!firstValue || !operator) return;
        const result = operate(firstValue, operator, displayValue);
        calculator.displayValue = result;
        calculator.firstValue = null;
        calculator.operator = null;
        calculator.isWaitingForSecondValue = true;
    }
    if (target.classList.contains('all')) {
        calculator.displayValue = '0';
        calculator.firstValue = null;
        calculator.operator = null;
        calculator.isWaitingForSecondValue = false;
    }
    if (target.classList.contains('backspace')) {
        calculator.displayValue = calculator.displayValue.slice(0, -1) || '0';
    }
    updateDisplay();
    console.log(calculator); 
});

function operate(first, operator, second) {
    const a = parseFloat(first);
    const b = parseFloat(second);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'Error' : a / b;
        default:
            return null;
    }
}