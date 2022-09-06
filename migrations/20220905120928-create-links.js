'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
      },
      order:{
        type: Sequelize.INTEGER,
      },
      linkTypeId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: "link_types"
          },
          key: "id"
        }
      },
      userId:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        }
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};