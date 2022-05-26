'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        mail: '123@mail.ru',
        pass: 'kotik1488',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bent Larsen',
        mail: '456@mail.ru',
        pass: 'nagibator0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
