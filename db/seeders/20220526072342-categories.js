'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Финансы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Спорт',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Политика',
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
