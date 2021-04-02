import "./index.html";
import "./scss/bundle.scss";
import { Pill } from "bootstrap";
import Project from "./js/models/project";
import ToDo from "./js/models/todo";
import domWorker from "./js/utils/domWorker";

const projectForm = document.getElementById("projectForm");

// Always add General project if it's unavailable
if (localStorage.length < 1) {
  const generalProject = new Project({ name: "General" });

  generalProject.on("aftersave", (proj) => domWorker.appendProject(proj, true));
  generalProject.save();

  const newTodo = new ToDo({
    title: "Hello, I am your task manager",
    projectId: generalProject.id,
    description: "I will help you organize your plan",
    dueDate: new Date(),
    priority: "low",
    notes: "You can delete me when you want",
  });

  newTodo.on("aftersave", (todo) => domWorker.appendTodo(todo));
  newTodo.save();
} else {
  // Append projects stored on local storage
  Project.getAll().forEach((project) => {
    const active = project.name.match(/general/i) ? true : false;
    domWorker.appendProject(project, active);
  });

  // Append todos stored on local storage in the active project's pane
  ToDo.getAll().forEach((todo) => {
    domWorker.appendTodo(todo);
  });
}

projectForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newProject = new Project({ name: formData.get("name") });

  if (newProject.save()) {
    const projects = Project.getAll();
    domWorker.appendProject(projects[projects.length - 1]);
  }
  event.currentTarget.reset();
};
