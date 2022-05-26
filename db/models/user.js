'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Prefer, Notprefer }) {
      this.hasMany(Prefer, { foreignKey: 'user_id' });
      this.hasMany(Notprefer, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    mail: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
