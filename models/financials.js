module.exports = function(sequelize, DataTypes) {
  var Financials = sequelize.define("Financials", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    userID: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    date: DataTypes.DATE,
    incomemonthly: DataTypes.INTEGER,
    rateofsaving: DataTypes.INTEGER
  });
  return Financials;
};