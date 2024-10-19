// unknown: similar to any type but more restrictive ( can't assign unknown type to other types directly)
// never: never returns anything whereas void returns undefined if console logged

let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

const result = generateError("An error occurred!", 500);
console.log(result);
