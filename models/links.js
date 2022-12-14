'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Link.belongsTo(models.LinkType)
    }
  }
  Link.init({
    url: DataTypes.STRING,
    linkTypeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};