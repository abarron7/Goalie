module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    goaldescr: DataTypes.STRING,
    goalamount: DataTypes.INTEGER,
    goaldate: DataTypes.STRING
  });
  return Users;
};