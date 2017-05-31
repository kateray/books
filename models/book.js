'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    src: DataTypes.STRING,
    google_id: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // Book.belongsToMany(models.List, {through: 'BookList'});
      }
    }
  });
  return Book;
};