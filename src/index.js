import "./index.html";
import "./scss/bundle.scss";
import { Project, ToDo } from "./js/todo.js";

const project = new Project({ name: "General" });
const todo = new ToDo({
  title: "Build the UI",
  description: "Work on the UI of Komrades web app",
});

console.log(project);
console.log(todo);
