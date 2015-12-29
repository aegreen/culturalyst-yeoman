'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Media', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    medium: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    active: DataTypes.BOOLEAN
  });
};
