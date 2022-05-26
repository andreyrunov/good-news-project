'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Cats',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Food',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Ukraine',
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
