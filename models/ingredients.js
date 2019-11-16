module.exports = (sequelize, DataTypes) => {
  const ingredients = sequelize.define("ingredients", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return ingredients;
};
