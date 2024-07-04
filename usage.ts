import { getEditableInput } from './editableInputPrint-utils.ts';

(async () => {
  let name = 'John'
  name = await getEditableInput('Enter your name: ', name);
  console.log(`Hello, ${name}!`);

  let age = 25
  age = await getEditableInput('Enter your age: ', age);
  console.log(`You are ${age} years old.`);
})();
