// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('actionData', {
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
    initialCapital: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quanlityA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantityA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quanlityB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantityB: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quanlityC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantityC: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualityInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    finantialInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loanInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  });
};
