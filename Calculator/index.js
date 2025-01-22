let currentInput = "";
let previousInput = "";
let operator = "";
let displayValue = "0";

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn, .number");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            handleOperator(value);
        } else if (value === "=") {
            calculateResult();
        } else if (value === "C") {
            clearAll();
        }
    });
});

function updateDisplay() {
    // Show the full expression
    if (previousInput && operator) {
        displayValue = `${previousInput} ${operator} ${currentInput || ""}`;
    } else {
        displayValue = currentInput || "0";
    }
    display.value = displayValue;
}

function handleNumber(number) {
    // Prevent multiple decimal points
    if (number === "." && currentInput.includes(".")) return;

    // Limit input length to prevent overflow
    if (currentInput.length >= 12) return;

    currentInput += number;
    updateDisplay();
}

function handleOperator(op) {
    if (currentInput === "" && previousInput === "") return;

    if (currentInput === "" && previousInput && operator) {
        // Allow changing operator if no second number entered
        operator = op;
        updateDisplay();
        return;
    }

    if (previousInput && currentInput && operator) {
        calculateResult();
    }

    operator = op;
    if (currentInput) {
        previousInput = currentInput;
        currentInput = "";
    }
    updateDisplay();
}

function calculateResult() {
    if (!previousInput || !operator) return;

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput || previousInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                clearAll();
                display.value = "Error";
                return;
            }
            result = prev / curr;
            break;
    }

    // Round long decimal results
    result = Math.round(result * 1000000) / 1000000;

    previousInput = result.toString();
    currentInput = "";
    operator = "";
    display.value = previousInput;
}

function clearAll() {
    currentInput = "";
    previousInput = "";
    operator = "";
    displayValue = "0";
    updateDisplay();
}