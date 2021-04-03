import Project from "../models/project";
import ToDo from "../models/todo";
import { setAttributes } from "../utils/utils";
import makeTodoCard from "../components/todoCard";

export default (() => {
  function appendProject(project) {
    const projectStack = document.getElementById("project-stack");
    const projectNav = _makeProjectNav(project);
    if (project.name.match(/general/i)) projectNav.classList.add("active");

    projectNav.onclick = _projectSwitchEvent;
    projectStack.appendChild(projectNav);
  }

  function appendTodo(todo) {
    const todoStack = document.getElementById("todo-stack");

    todoStack.appendChild(makeTodoCard(todo));
  }

  function getActiveNav() {
    return document.querySelector("#project-stack .nav-link.active");
  }

  function getProjectNavs() {
    return document.querySelectorAll("#project-stack .nav-link");
  }

  function _makeProjectNav(project) {
    const navBtn = document.createElement("button");

    navBtn.classList.add("nav-link", "lead", "text-primay", "text-start");
    navBtn.innerText = project.name;
    setAttributes(navBtn, { id: project.id, "data-bs-toggle": "pill" });

    return navBtn;
  }

  function _projectSwitchEvent(event) {
    let todos = ToDo.getAllByProject(event.currentTarget.id);
  }
  return { appendProject, appendTodo, getActiveNav, getProjectNavs, setAttributes };
})();
