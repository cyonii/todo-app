import { randomID } from "./utilities";
import EventEmitter from "events";
import _ from "lodash";

export default class Project extends EventEmitter {
  constructor(name, id = null) {
    super();
    this.name = name.trim();
    this.id = id ? id : randomID();
  }

  exists() {
    const storedProjects = Project.getStoredProjects(true) || [];
    const found = storedProjects.find((project) => {
      return project.name.match(new RegExp(this.name.trim(), "i"));
    });

    return found ? true : false;
  }

  isValid() {
    return !this.exists() && this.name;
  }

  save() {
    if (this.isValid()) {
      const saveData = _.pick(this, ["name", "id"]);
      const projects = Project.getStoredProjects(true) || [];

      projects.push(saveData);

      localStorage.setItem("projects", JSON.stringify(projects));
      this.emit("aftersave", this);
      return true;
    }
    return false;
  }

  delete() {
    // localStorage.removeItem(this.name);
  }

  static getStoredProjects(parse = false) {
    const projects = localStorage.getItem("projects");
    if (projects && parse) return JSON.parse(projects);
    return projects;
  }
}
