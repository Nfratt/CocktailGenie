module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      }
    }
  });
  return users;
};
