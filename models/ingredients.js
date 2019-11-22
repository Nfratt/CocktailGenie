module.exports = (sequelize, DataTypes) => {
  const ingredients = sequelize.define("ingredients", {
    ingredientsName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  // ingredients.associate = function(models) {
  //   ingredients.belongsTo(models.Recipe, {
  //     onDelete: "cascade"
  //   });
  //   ingredients.belongsTo(models.users, {
  //     onDelete: "cascade"
  //   });
  // };
  return ingredients;
};
