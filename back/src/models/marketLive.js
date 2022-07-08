const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('marketLive', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    playerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeProduct: {
      type: DataTypes.ENUM,
      values: ['A', 'B', 'C']
    },
    stockProduct: {
      type: DataTypes.INTEGER,
    },
    qualityProduct: {
      type: DataTypes.INTEGER,
    },
    priceProduct: {
      type: DataTypes.INTEGER,
    },
    totalSoldProduct: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  });
};
