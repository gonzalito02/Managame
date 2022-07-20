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
    type: {
      type: DataTypes.TEXT,
      defaultValue: "actionForm"
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualityA: {
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
    qualityB: {
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
    qualityC: {
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
    finantialFixedInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    finantialFixedRentability: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    validateByAdmin: {
      type: DataTypes.INTEGER, // 0 pendiente, 1 validado, 2 rechazado
      defaultValue: 0
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  });
};
