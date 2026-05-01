let currentExpression = '';
const display = document.getElementById('display');

function updateDisplay(value) {
    display.textContent = value || '0';
}

function appendNumber(num) {
    if (currentExpression === '0' && num !== '.') {
        currentExpression = num;
    } else {
        currentExpression += num;
    }
    updateDisplay(currentExpression);
}

function appendOperator(operator) {
    // Basic protection against multiple consecutive operators (simplified)
    const lastChar = currentExpression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(operator)) {
        currentExpression = currentExpression.slice(0, -1) + operator;
    } else {
        currentExpression += operator;
    }
    updateDisplay(currentExpression.replace(/\*/g, '×').replace(/\//g, '÷'));
}

function clearDisplay() {
    currentExpression = '';
    updateDisplay('0');
}

function calculate() {
    try {
        if (!currentExpression) return;
        
        // Use a safe evaluation method or basic eval for simple math
        // In a production app with user input we'd use a math parser library
        // but for this simple demo eval is sufficient if contained strictly to math operators
        
        // Remove any dangerous characters, allow only math symbols
        const safeExpression = currentExpression.replace(/[^-()\d/*+.]/g, '');
        
        let result = eval(safeExpression);
        
        // Handle floating point precision issues
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }
        
        currentExpression = String(result);
        updateDisplay(currentExpression);
    } catch (e) {
        updateDisplay('Error');
        currentExpression = '';
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].test(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'Backspace' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});
