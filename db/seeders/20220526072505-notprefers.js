'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notprefers', [
      {
        text: 'Ukraine',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Nazi',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        text: 'Russia',
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
