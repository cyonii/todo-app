import faker from 'faker';

export const IDPattern = /^[A-Z]{1}\d{8,10}$/;

export function fakerTaskData() {
  const priorities = ['low', 'mid', 'high'];
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(3),
    dueDate: new Date(),
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    notes: faker.lorem.paragraph(1),
  };
}
