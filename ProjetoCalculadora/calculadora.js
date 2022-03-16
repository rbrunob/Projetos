const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //FORMATAÇÃO DE NUMEROS NA CALCULADORA
    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    //FUNÇÃO PARA DELETAR O ULTIMO CARACTER ADICIONADO
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calculate() {
        let result;
        //FUNÇÃO PARA FUNCIONAMENTO DAS OPERAÇÕES
        const _previousOperand = parseFloat(this.previousOperand)
        const _currentOperand = parseFloat(this.currentOperand)

        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperand;
                break;
            case "-":
                result = _previousOperand - _currentOperand;
                break;
            case "÷":
                result = _previousOperand / _currentOperand;
                break;
            case "*":
                result = _previousOperand * _currentOperand;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {

        if (this.currentOperand == '') return;

        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = " ";
    }

    appendNumber(number) {
        //SE O BOTÃO SELECIONADO FOR PONTO ELE VAI RETORNAR E ESPERAR UM NOVO BOTÃO SER SELECIONADO.
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${
          this.operation || ""
      }`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(
            this.currentOperand
        );
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);
//FUNÇÃO DOS BOTÕES NÚMEROS E O PONTO
for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}
//FUNÇÃO QUE LIMPA TUDO DO BOTÃO 'AC'
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

//BOTÃO DE IGUALDADE 
equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
})

//BOTÃO DE DELETAR
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})