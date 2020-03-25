'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    content: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['-1', '0', '1'], // -1 为删除 , 0 为代办,1为完成
      defaultValue: '0',
    }
  }, { timestamps: false });
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};
