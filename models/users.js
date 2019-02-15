module.exports = function(sequelize, DataTypes) {
  var UsersX = sequelize.define("UsersX", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING
    },
    goaldescr: DataTypes.STRING,
    goalamount: DataTypes.INTEGER,
    goaldate: DataTypes.STRING
  });
  return UsersX;
};
