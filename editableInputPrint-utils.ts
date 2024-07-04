import * as readline from "readline";
import * as process from "process";

// Function to update the displayed line
const updateLine = (line: string) => {
  readline.cursorTo(process.stdout, 0); // Move the cursor to the beginning of the line
  process.stdout.write("\x1b[2K"); // Clear the line
  process.stdout.write(line); // Write the updated line
};

// Function to handle keypress events and edit the input string
const handleKeypress = (
  initialInput: string,
  resolve: (value: string) => void
) => {
  let inputLine = initialInput; // Ensure initialInput is treated as a string

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", (char: string, key: { name: string }) => {
    if (key && key.name === "backspace") {
      inputLine = inputLine.slice(0, -1);
    } else if (key && key.name === "return") {
      process.stdin.setRawMode(false);
      console.log();
      resolve(inputLine);
      return;
    } else if (char && char !== "\r") {
      inputLine += char;
    }
    updateLine(inputLine);
  });

  updateLine(initialInput); // Display initial input
};

// Function to take a question and an initial input (string or number), and return the final string
export const getEditableInput = (
  question: string,
  initialInput: string | number
): Promise<string> => {
  return new Promise((resolve) => {
    const initialInputString = String(initialInput); // Convert to string
    console.log(`${question}`);
    handleKeypress(initialInputString, resolve);
  });
};
