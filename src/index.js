import "./index.html";
import "./scss/bundle.scss";
import { Pill } from "bootstrap";
import Project from "./js/project";
import ToDo from "./js/todo";
import domWorker from "./js/domWorker";

const projectForm = document.getElementById("projectForm");

// Always add General project if it's unavailable
if (localStorage.length < 1) {
  const generalProject = new Project({ name: "General" });

  generalProject.on("aftersave", (proj) => domWorker.appendProject(proj, true));
  generalProject.save();

  const newTodo = new ToDo({
    title: "Hello, I am your task manager",
    projectId: domWorker.getActiveNav().id,
    description: "I will help you organize your plan",
    dueDate: new Date(),
    priority: "low",
    notes: "You can delete me when you want",
  });
  newTodo.save();
} else {
  // Append projects stored on local storage
  Project.getAll().forEach((data) => {
    const newProject = new Project(data);
    const active = newProject.name.match(/general/i) ? true : false;

    domWorker.appendProject(newProject, active);
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
