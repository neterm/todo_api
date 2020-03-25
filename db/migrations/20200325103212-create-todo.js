'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      content: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['-1', '0', '1'],
        defaultValue: '0'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todos');
  }
};