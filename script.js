const input = document.getElementsByClassName("input")[0];
const display = document.getElementsByClassName("display")[0];
const back = document.querySelector("[data-back]");
const reset = document.querySelector("[data-reset]");
const calculate = document.querySelector("[data-calc]");
const numbers = [...document.querySelectorAll("[data-num]")];
const operators = [...document.querySelectorAll("[data-oper]")];
const period = document.querySelector("[data-period]");
let lastEntry, isCurrentNumberDecimal=false, numberCount = 1;


// appending numbers to inputs
document.addEventListener("click", e => {
  let currrentNumber;
  if(!e.target.matches("[data-num]")) return;

  numbers.forEach(number => {
    if(e.target == number) 
    {currrentNumber = number;}
  });
  
  if(currrentNumber == null) return;
  
  if(input.textContent == "")
  { input.textContent = currrentNumber.value; }
  else { input.textContent = input.textContent +  currrentNumber.value; }

  lastEntry = currrentNumber;
});

// appending operators to input
document.addEventListener("click", e => {
  let currrentOperator;
  let isLastEntryOperator = false;

  operators.forEach(operator => {
    if(lastEntry == operator) {isLastEntryOperator = true;}
  });  

  if(!e.target.matches("[data-oper]") || isLastEntryOperator === true || lastEntry === period) return;

  operators.forEach(operator => {
    if(e.target == operator) 
    {currrentOperator = operator;}
  });
  
  if(currrentOperator == null || input.textContent === "") return;
  else {
    input.textContent = input.textContent +  currrentOperator.value;
  }
  lastEntry = currrentOperator;
  isCurrentNumberDecimal=false;
  numberCount++;
});

// appending period to input
period.addEventListener("click", e => {
  if(lastEntry === period || isCurrentNumberDecimal === true) return;

  let isLastEntryOperator = false;
  operators.forEach(operator => {
    if(lastEntry == operator) {isLastEntryOperator = true;}
  });
  
  if(input.textContent === ""){ 
    input.textContent = "0"+period.value; 
  }
  else if(isLastEntryOperator) { 
    input.textContent = input.textContent + "0"+  period.value; 
  }
  else {
    input.textContent = input.textContent +  period.value;
  }

  lastEntry = period;
  isCurrentNumberDecimal=true;
});

// reset button
reset.addEventListener("click", () => {
  input.textContent = "";
  display.textContent = "";
  isCurrentNumberDecimal=false;
  numberCount = 1;
});

// back button
back.addEventListener("click", () => {
  if(input.textContent === "") return;

  let secondLastChar = input.textContent.charAt(input.textContent.length - 2);
  let lastChar = input.textContent.charAt(input.textContent.length - 1);
  let lastCharType = checkCharType(lastChar);
  let secondLastCharType = checkCharType(secondLastChar);

  if(lastCharType === "period") {
    isCurrentNumberDecimal=false;
  }
  else if(lastCharType === "operator"){
    let check = isLastNumberFloat();
    if(!check) { 
      isCurrentNumberDecimal=false; 
    }
    else if(check){ 
      isCurrentNumberDecimal=true; 
    }
    numberCount--;
  }

  removeLastChar();
  setLastEntry(secondLastChar, secondLastCharType);  
});

function checkCharType(char) {
  let charType;
  operators.forEach(operator => {
    if(char === operator.value) {
      charType = "operator";
    }
  });
  numbers.forEach(number => {
    if(char === number.value) {
      charType = "number";
    }
  });
  if(char === period.value) {
    charType= "period";
  }
  return charType;
}

function setLastEntry(char, charType) {
  if (charType === "period") {
    lastEntry = period;
    isCurrentNumberDecimal = true;
  }
  else if (charType === "operator") {
    operators.forEach(operator => {
      if(char === operator.value) {
        lastEntry = operator;
        isCurrentNumberDecimal=false;
      }
    });
  }
  else if (charType === "number") {
    numbers.forEach(number => {
      if(char === number.value) {
        lastEntry = number;
      }
    });
  }
}

function isLastNumberFloat(){
  let checkString = input.textContent.slice(0,-1);
  let stringLength = checkString.length - 1;
  let currentchar, result=false;

  for(let i = stringLength; i >= 0; i--){
    currentchar = checkString.charAt(i);
    if(currentchar === period.value ) {
      result = true; 
      break;
    }
    else if(currentchar === operators.forEach(operator => operator.value)) {
      result = false;
      break;
    }
  }
  return result;
}

function removeLastChar() {
  let newInput = input.textContent.slice(0,-1);
  input.textContent = newInput;
}

// calculate & Display button
calculate.addEventListener("click", () => {
  if(input.textContent === "" || numberCount < 2) return;

  let isLastEntryNumber =false;
  numbers.forEach(number => {
    if(lastEntry == number) {isLastEntryNumber = true;}
  });
  if (!isLastEntryNumber) return;

  if(display.textContent !== "") {
    display.textContent = "";
  }

  let result = eval(input.textContent);
  display.textContent = result;
  input.textContent = "";
  isCurrentNumberDecimal=false;
  numberCount = 1;
});
