'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'singing cats',
        text: 'Cute cat wrote a very beautiful song. Ckeck it now or never',
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'record',
        text: 'biggest pizza was made in China! It is not tasty at all(',
        img: 'https://ru.wikipedia.org/wiki/%D0%9F%D0%B8%D1%86%D1%86%D0%B0#/media/%D0%A4%D0%B0%D0%B9%D0%BB:Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'huge tragedy(',
        text: 'Little cute kitty is dead now. Well, actually, nobody cares',
        img: 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%88%D0%BA%D0%B0#/media/%D0%A4%D0%B0%D0%B9%D0%BB:Jammlich_crop.jpg',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'random news',
        text: 'Azaza lol kek cheburek',
        img: 'https://en.wikipedia.org/wiki/Adolf_Hitler#/media/File:Hitler_portrait_crop.jpg',
        category_id: 1,
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
