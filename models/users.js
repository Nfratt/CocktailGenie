module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  // users.associate = function(models) {
  //   users.hasMany(models.Recipe, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  //   users.hasMany(models.ingredients, {
  //     foreignKey: "ownerId"
  //   });
  // };
  return users;
};
