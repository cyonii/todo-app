import "./index.html";
import "./scss/bundle.scss";
import { Pill } from "bootstrap";
import Project from "./js/project";
import ToDo from "./js/todo";
import domWorker from "./js/domWorker";

const projectForm = document.getElementById("projectForm");

// Always add General project if it's unavailable
if (localStorage.length < 1) {
  const generalProject = new Project("General");

  generalProject.on("aftersave", (p) => domWorker.appendProject(p));
  generalProject.save();
} else {
  // Append projects stored on local storage
  Project.getStoredProjects(true).forEach((project) => {
    const { name, id } = project;
    const newProject = new Project(name, id);

    domWorker.appendProject(newProject);
  });
}

// const newTodo = new ToDo({
//   title: "Hello, I am your task manager",
//   description: "I will help you organize your plan",
//   dueDate: new Date(),
//   priority: "low",
//   notes: "You can delete me when you want",
// });

projectForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newProject = new Project(formData.get("name"));

  if (newProject.save()) {
    const projects = Project.getStoredProjects(true);
    domWorker.appendProject(projects[projects.length - 1]);
  }
  event.currentTarget.reset();
};
