module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define("Goals", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    userID: DataTypes.INTEGER,
    g1descr: DataTypes.STRING,
    g1amount: DataTypes.INTEGER,
    g1date: DataTypes.STRING,
    g2descr: DataTypes.STRING,
    g2amount: DataTypes.INTEGER,
    g2date: DataTypes.STRING,
    g3descr: DataTypes.STRING,
    g3amount: DataTypes.INTEGER,
    g3date: DataTypes.STRING
  });
  return Goals;
};
