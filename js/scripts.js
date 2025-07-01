const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ""
        this.error = false;
    }

    addDigit(digit){
        console.log(digit);

        if(this.error) return;

        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operation){
        if (this.error && operation !== "C" && operation !== "HIST") return;

        if(this.currentOperationText.innerText === ""){
            if(this.previousOperationText.innerText !== "" && operation != "="){
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current  = +this.currentOperationText.innerText;
        
       if(isNaN(previous)){
        previous = 0
       }

       if(isNaN(current)){
        current = 0;
       }

        switch(operation){
            case "+":
                this.processSumOperation(previous, current);
                break;
            case "-":
                this.processSubtractionOperation(previous, current);
                break;
            case "*":
                this.processMultiplicationOperation(previous,current);
                break;
            case "/":
                this.processDivisionOperation(previous, current);
                break;
            case "DEL":
                this.preocessDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperator();
                break;
            case "C":
                this.processClearOperator();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
      if(operationValue === null){
          this.currentOperationText.innerText += this.currentOperation;        
      }
      else{
        if(previous === 0){
            operationValue = current;
        }
        
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
      }
    }

    changeOperation(operation){
        const MathOperations = ["*", "-", "+", "/"]

        if(!MathOperations.includes(operation)){
            return;
        }

       this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
    }

     processSumOperation(previous, current){
        const result = previous + current;
        this.updateScreen(result, "+", current, previous);
    }

    processSubtractionOperation(previous, current){
        const result = previous - current;
        this.updateScreen(result, "-", current, previous);
    }

    processMultiplicationOperation(previous, current){
        const result = previous * current;
        this.updateScreen(result, "*", current, previous);
    }

    processDivisionOperation(previous, current){
        if(current === 0){
            this.currentOperationText.innerText = "Erro: divisão por zero!\n Aperte C e efetue outra operação!";
            this.error = true;
            return;
        }
        const result = previous / current;
        this.updateScreen(result, "/", current, previous);
    }

    preocessDelOperator(){
       this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
        this.error = false;
    }

    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }

}

const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) => { 
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        }
        else{
            calc.processOperation(value);
        }
    });

})
