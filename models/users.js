module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return Users;
};
