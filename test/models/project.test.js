import faker from 'faker';
import Project from '../../src/js/models/project';
import Task from '../../src/js/models/task';
import { fakeTaskData } from '../testData';

describe('Project', () => {
  let validProject;
  const idPattern = /[A-Z]\d{9,10}/;

  beforeEach(() => {
    localStorage.clear();
    validProject = new Project({ name: 'Test Project' });
  });

  describe('constructor', () => {
    it('creates a project instance', () => {
      expect(validProject.id).toMatch(idPattern);
      expect(validProject instanceof Project).toBe(true);
    });
  });

  describe('\n  ==Instance methods==', () => {
    describe('isValid', () => {
      it('does not validate a project without a name', () => {
        validProject.name = null;
        expect(validProject.isValid()).toBe(false);
      });

      it('validates projects with valid attributes', () => {
        expect(validProject.isValid()).toBe(true);
      });
    });

    describe('save', () => {
      it('saves new project to localStorage', () => {
        expect(validProject.save()).toBe(true);
      });

      it("doesn't save project with duplicate name to localStorage", () => {
        validProject.save(); // save it the first time
        expect(validProject.save()).toBe(false);
      });
    });

    describe('exists', () => {
      it('returns false if no project with this name has been saved', () => {
        expect(validProject.exists()).toBe(false);
      });

      it('returns true if project with this name is saved already', () => {
        const duplicateProject = new Project(validProject);

        validProject.save();
        expect(duplicateProject.exists()).toBe(true);
      });
    });

    describe('getTasks', () => {
      beforeEach(() => {
        new Task({ ...fakeTaskData, projectId: validProject.id }).save();
        new Task({ ...fakeTaskData, projectId: validProject.id }).save();
      });

      it('returns all tasks saved under a project', () => {
        expect(validProject.getTasks().length).toBe(2);
      });

      it('all returned todos are instances of Todo', () => {
        expect(validProject.getTasks().every((task) => task instanceof Task)).toBe(true);
      });
    });
  });

  describe('\n  ==Static methods==', () => {
    describe('createDefault', () => {
      it('creates General (default) project', () => {
        const defaultProject = Project.createDefault();
        expect(defaultProject.name).toBe('General');
        expect(defaultProject.id).toMatch(idPattern);
      });
    });

    describe('get', () => {
      beforeEach(() => validProject.save());

      it('return the project with the given id', () => {
        expect(Project.get(validProject.id).id).toBe(validProject.id);
      });

      test('returned project is an instance of Project', () => {
        expect(Project.get(validProject.id) instanceof Project).toBe(true);
      });
    });

    describe('getAll', () => {
      beforeEach(() => {
        for (let i = 0; i < 10; i += 1) {
          new Project({ name: faker.lorem.words(2) }).save();
        }
      });

      it('returns all projects saved on localStorage', () => {
        expect(Project.getAll().length).toBe(10);
      });

      test('all returned objects are instances of Project', () => {
        expect(Project.getAll().every((project) => project instanceof Project)).toBe(true);
      });
    });
  });
});
