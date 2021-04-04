import ToDo from '../models/todo';

export function generateRandomStr(length = 1) {
  const characters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

  return characters.charAt(Math.floor(Math.random() * length));
}

export function randomID() {
  const digits = Math.floor(Math.random(425367) * 10000000000);
  const char = generateRandomStr();
  return char + digits.toString();
}

export function setAttributes(el, attrs) {
  Object.entries(attrs).forEach((entry) => el.setAttribute(entry[0], entry[1]));
}

export function deleteTask(event) {
  const taskID = event.currentTarget.getAttribute('data-todo');
  ToDo.get(taskID).delete();
}
