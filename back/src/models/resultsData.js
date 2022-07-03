// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('resultsData', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investmentResults: {
      type: DataTypes.INTEGER,
    },
    loanResults: {
      type: DataTypes.INTEGER,
    },
    extraResults: {
      type: DataTypes.INTEGER,
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
