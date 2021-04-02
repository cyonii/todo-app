import Project from "./project";
import ToDo from "./todo";

export default (() => {
  function appendProject(project, active = false) {
    const projectStack = document.getElementById("project-stack");
    const projectNav = _makeProjectNav(project);
    if (active) projectNav.classList.add("active");

    projectNav.onclick = _projectSwitchEvent;
    projectStack.appendChild(projectNav);
  }

  function appendTodo(todo) {
    const todoStack = document.getElementById("todo-stack");

    todoStack.appendChild(_makeTodoCard(todo));
  }

  function getActiveNav() {
    return document.querySelector("#project-stack .nav-link.active");
  }

  function getProjectNavs() {
    return document.querySelectorAll("#project-stack .nav-link");
  }

  function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  function _makeProjectNav(project) {
    const navBtn = document.createElement("button");

    navBtn.classList.add("nav-link", "lead", "text-primay", "text-start");
    navBtn.innerText = project.name;
    setAttributes(navBtn, { id: project.id, "data-bs-toggle": "pill" });

    return navBtn;
  }

  function _makeTodoCard(todo) {
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const collapseToggler = document.createElement("button");
    const collapse = document.createElement("div");
    const cardBody = document.createElement("div");
    const todoDesc = document.createElement("p");

    card.classList.add("card", "overflow-hidden", "border-0", "shadow-sm", "mb-3");
    cardHeader.classList.add("card-header", "p-0");
    collapse.classList.add("collapse");
    collapse.id = `${todo.projectId}Collapse`;
    collapseToggler.innerText = todo.title;
    collapseToggler.classList.add(
      "btn",
      "btn-secondary",
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "w-100",
      "text-start",
      "fw-light",
      "rounded-0"
    );
    setAttributes(collapseToggler, {
      "data-bs-toggle": "collapse",
      "data-bs-target": `#${todo.projectId}Collapse`,
      "aria-expanded": "false",
    });
    cardBody.classList.add("card-body");
    todoDesc.classList.add("card-text", "text-primary", "mb-0");
    todoDesc.innerText = todo.description;

    cardHeader.appendChild(collapseToggler);
    card.appendChild(cardHeader);
    cardBody.appendChild(todoDesc);
    collapse.appendChild(cardBody);
    card.appendChild(collapse);
    return card;
  }

  function _projectSwitchEvent(event) {
    let todos = ToDo.getAllByProject(event.currentTarget.id);
  }
  return { appendProject, appendTodo, getActiveNav, getProjectNavs, setAttributes };
})();
