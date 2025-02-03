// Get DOM elements
const disp = document.getElementById("disp");
const delet = document.getElementById("del");
const numbers_buttons = document.querySelectorAll(".num");
const operations_buttons = document.querySelectorAll(".operation");
const clear = document.getElementById("clear");
const toggle = document.getElementById("toggle");
const equal = document.getElementById("equal");
const dot = document.getElementById("dot");
const percent = document.getElementById("percent");

// Variables
const operations = ["add", "subtract", "multiply", "divide"];
let currentOperation = "";
let counter = 0;

// Functions
function dispDel() {
    delet.innerHTML = disp.innerHTML === "0" ? "AC" : "<img src=\"./pngwing.com (1).png\" alt=\"\">";
}

function toggleSign() {
    const value = disp.innerHTML;
    disp.innerHTML = value[0] === "-" ? value.slice(1) : "-" + value;
}

function appendNumber(number) {
    disp.innerHTML = disp.innerHTML === "0" ? number : disp.innerHTML + number;
}

function buttonLog(num) {
    if (num) {
        console.log(`n: ${num}, d: ${disp.innerHTML}, c: ${counter}`);
    } else {
        console.log(`d: ${disp.innerHTML}, c: ${counter}`);
    }
}

function handleDelete() {
    if (delet.innerHTML === "AC") {
        disp.innerHTML = "0";
        counter = 0;
        currentOperation = "";
        currentOperationStyle();
    } else {
        disp.innerHTML = disp.innerHTML.length === 1 ? "0" : disp.innerHTML.slice(0, -1);
    }
    dispDel();
}

function handleClear() {
    disp.innerHTML = "0";
    counter = 0;
    currentOperation = "";
    currentOperationStyle();
    dispDel();
    buttonLog();
}

function currentOperationStyle() {
    operations_buttons.forEach(button => {
        if (button.id === currentOperation) {
            button.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        } else {
            button.style = "";
        }
    });
}

// Event listeners
toggle.addEventListener("click", toggleSign);

numbers_buttons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerHTML);
        dispDel();
        buttonLog(button.innerHTML);
    });
});

delet.addEventListener("click", () => {
    handleDelete();
    buttonLog();
});

dot.addEventListener("click", () => {
    if (!disp.innerHTML.includes(".")) {
        disp.innerHTML += ".";
    }
    dispDel();
    buttonLog();
});

percent.addEventListener("click", () => {
    disp.innerHTML = parseFloat(disp.innerHTML) / 100;
    dispDel();
    buttonLog();
});

clear.addEventListener("click", handleClear);

operations_buttons.forEach(button => {
    button.addEventListener("click", () => {
        for (let operation of operations) {
            if (button.id === operation) {
                console.log(operation);
                currentOperation = operation;
            }
        }
        counter = parseFloat(disp.innerHTML);
        disp.innerHTML = "0";
        currentOperationStyle();
        dispDel();
        buttonLog();
    });
});

equal.addEventListener("click", () => {
    console.log(`${counter} ${currentOperation} ${disp.innerHTML}`);
    switch (currentOperation) {
        case "add":
            counter += parseFloat(disp.innerHTML);
            break;
        case "subtract":
            counter -= parseFloat(disp.innerHTML);
            break;
        case "multiply":
            counter *= parseFloat(disp.innerHTML);
            break;
        case "divide":
            counter /= parseFloat(disp.innerHTML);
            break;
        default:
            counter = parseFloat(disp.innerHTML);
            break;
    }
    disp.innerHTML = counter;
    currentOperation = "";
    currentOperationStyle();
    dispDel();
    buttonLog();
});
