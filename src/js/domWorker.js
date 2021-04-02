import Project from "./project";
import ToDo from "./todo";

export default (() => {
  function _makeProjectNav(project) {
    const navBtn = document.createElement("button");

    navBtn.classList.add("nav-link", "lead", "text-primay", "text-start");
    navBtn.innerText = project.name;
    setAttributes(navBtn, { id: project.id, "data-bs-toggle": "pill" });

    return navBtn;
  }

  function _makeTodoCard(todo) {
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h6");

    cardTitle.innerText = todo.title;
    cardBody.appendChild(cardTitle);
    card.appendChild(cardBody);

    return card;
  }

  function _projectSwitchEvent(event) {
    let project = Project.get(event.currentTarget.id);
    let todos = ToDo.getAllByProject(project.id);

    console.log(todos);
  }

  function appendProject(project, active = false) {
    const projectStack = document.getElementById("project-stack");
    const projectNav = _makeProjectNav(project);
    if (active) projectNav.classList.add("active");

    projectNav.onclick = _projectSwitchEvent;
    projectStack.appendChild(projectNav);
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

  return { appendProject, getActiveNav, getProjectNavs, setAttributes };
})();
