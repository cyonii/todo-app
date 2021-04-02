import { randomID } from "./utilities";
import EventEmitter from "events";
import _ from "lodash";

export default class Project extends EventEmitter {
  constructor(props) {
    super();
    this.name = props.name.trim();
    this.id = props.id ? props.id : randomID();
  }

  exists() {
    const storedProjects = Project.getAll();
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
      const storedProjects = Project.getAll();

      storedProjects.push(_.pick(this, ["name", "id"]));

      localStorage.setItem("projects", JSON.stringify(storedProjects));
      this.emit("aftersave", this);
      return true;
    }
    return false;
  }

  delete() {
    // localStorage.removeItem(this.name);
  }

  static get(id) {
    const partialData = Project.getAll().find((project) => project.id == id);
    return new Project(partialData);
  }

  static getAll() {
    const partialData = JSON.parse(localStorage.getItem("projects")) || [];
    return partialData.map((data) => new Project(data));
  }
}
