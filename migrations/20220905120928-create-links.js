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
        defaultValue: 1
      },
      linkTypeId: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: "linkTypes"
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('links');
  }
};