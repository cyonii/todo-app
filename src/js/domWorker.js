export default (() => {
  function makeProjectCard(project) {
    const navBtn = document.createElement("button");

    navBtn.classList.add("nav-link", "lead", "text-primay", "text-start");
    navBtn.innerText = project.name;
    setAttributes(navBtn, {
      type: "button",
      id: project.id,
      "data-bs-toggle": "pill",
      role: "tab",
    });

    return navBtn;
  }

  function appendProject(project) {
    const projectStack = document.getElementById("project-stack");
    const projectCard = makeProjectCard(project);

    projectStack.appendChild(projectCard);
  }

  function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  return { appendProject, setAttributes };
})();
