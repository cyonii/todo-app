export class Project {
  constructor(props) {
    this.name = props.name;
  }
}

export class ToDo {
  constructor(props) {
    this.title = props.title;
    this.description = props.description;
    this.dueDate = props.dueDate;
    this.priority = props.priority;
    this.notes = props.notes;
  }
}
