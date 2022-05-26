'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Prefers', [
      {
        text: 'Cats',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Cute',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Pizza',
        user_id: 1,
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
