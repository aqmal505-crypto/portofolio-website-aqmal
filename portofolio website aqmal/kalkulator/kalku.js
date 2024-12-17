const resultInput = document.getElementById("result");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("clear")) {
      currentInput = "";
      resultInput.value = "";
    } else if (button.classList.contains("backspace")) {
      currentInput = currentInput.slice(0, -1);
      resultInput.value = currentInput;
    } else if (button.classList.contains("equal")) {
      try {
        currentInput = currentInput.replace(/x/g, "*");
        resultInput.value = eval(currentInput);
        currentInput = resultInput.value;
      } catch (error) {
        resultInput.value = "Error";
        currentInput = "";
      }
    } else {
      currentInput += value;
      resultInput.value = currentInput;
    }
  });
});
