module.exports = function(sequelize, DataTypes) {
  var Meme = sequelize.define("Meme", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Meme;
};
