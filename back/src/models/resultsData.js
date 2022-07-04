// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('resultsData', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finantialInvestmentResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qualityInvestmentResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loanResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    extraResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    observations: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
