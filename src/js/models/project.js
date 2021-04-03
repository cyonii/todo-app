import _ from 'lodash';
import { randomID } from '../utils/utils';

export default class Project {
  constructor(props) {
    this.name = props.name.trim();
    this.id = props.id ? props.id : randomID();
  }

  exists() {
    const storedProjects = Project.getAll();
    const found = storedProjects.find((project) => {
      const pattern = new RegExp(this.name.trim());
      return project.name.match(pattern, 'i');
    });

    if (found) return true;
    return false;
  }

  isValid() {
    return !this.exists() && this.name;
  }

  save() {
    if (this.isValid()) {
      const storedProjects = Project.getAll();

      storedProjects.push(_.pick(this, ['name', 'id']));

      localStorage.setItem('projects', JSON.stringify(storedProjects));
      return true;
    }
    return false;
  }

  static get(id) {
    const partialData = Project.getAll().find((project) => project.id === id);
    return new Project(partialData);
  }

  static getAll() {
    const partialData = JSON.parse(localStorage.getItem('projects')) || [];
    return partialData.map((data) => new Project(data));
  }
}
