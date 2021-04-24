const faker = require('faker');

exports.fakeTaskData = () => {
  const priorities = ['low', 'mid', 'high'];
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(5),
    dueDate: new Date(),
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    notes: faker.lorem.paragraph(2),
  };
};
