module.exports = function(sequelize, DataTypes) {
  var Goals = sequelize.define("Goals", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    userID: DataTypes.INTEGER,
    g1descr: DataTypes.STRING,
    g1amount: DataTypes.FLOAT,
    g1Wk: DataTypes.STRING,
    wksWanted: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    g2descr: DataTypes.STRING,
    g2amount: DataTypes.FLOAT,
    g2Wk: DataTypes.STRING,
    wksWanted2: DataTypes.STRING,
    balance2: DataTypes.FLOAT,
    g3descr: DataTypes.STRING,
    g3amount: DataTypes.FLOAT,
    g3Wk: DataTypes.STRING,
    wksWanted3: DataTypes.STRING,
    balance3: DataTypes.FLOAT
  });
  return Goals;
};
