module.exports = function (sequelize, DataTypes) {
  var Meme = sequelize.define("Meme", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    importance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Personal",
      allowNull: false
    }
  });
  return Meme;
};
