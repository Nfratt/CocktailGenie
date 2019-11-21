module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instruction: {
      type: DataTypes.TEXT
    },
    vegan: {
      type: DataTypes.BOOLEAN
    },
    ingredients: {
      type: DataTypes.TEXT
    }
  });
  // Recipe.associate = function(models) {
  //   Recipe.belongsTo(models.users, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  //   Recipe.hasMany(models.ingredients, {
  //     as: "test_id",
  //     onDelete: "cascade"
  //   });
  // };
  return Recipe;
};
