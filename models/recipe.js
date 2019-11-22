module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instruction: {
      type: DataTypes.TEXT
    },
    ingredient1: {
      type: DataTypes.STRING
    },
    ingredient2: {
      type: DataTypes.STRING
    },
    ingredient3: {
      type: DataTypes.STRING
    },
    ingredient4: {
      type: DataTypes.STRING
    },
    ingredient5: {
      type: DataTypes.STRING
    },
    ingredient6: {
      type: DataTypes.STRING
    },
    ingredient7: {
      type: DataTypes.STRING
    },
    ingredient8: {
      type: DataTypes.STRING
    },
    ingredient9: {
      type: DataTypes.STRING
    },
    ingredient10: {
      type: DataTypes.STRING
    },
    ingredient11: {
      type: DataTypes.STRING
    },
    ingredient12: {
      type: DataTypes.STRING
    },
    ingredient13: {
      type: DataTypes.STRING
    },
    ingredient14: {
      type: DataTypes.STRING
    },
    ingredient15: {
      type: DataTypes.STRING
    },
    measure1: {
      type: DataTypes.STRING
    },
    measure2: {
      type: DataTypes.STRING
    },
    measure3: {
      type: DataTypes.STRING
    },
    measure4: {
      type: DataTypes.STRING
    },
    measure5: {
      type: DataTypes.STRING
    },
    measure6: {
      type: DataTypes.STRING
    },
    measure7: {
      type: DataTypes.STRING
    },
    measure8: {
      type: DataTypes.STRING
    },
    measure9: {
      type: DataTypes.STRING
    },
    measure10: {
      type: DataTypes.STRING
    },
    measure11: {
      type: DataTypes.STRING
    },
    measure12: {
      type: DataTypes.STRING
    },
    measure13: {
      type: DataTypes.STRING
    },
    measure14: {
      type: DataTypes.STRING
    },
    measure15: {
      type: DataTypes.STRING
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
