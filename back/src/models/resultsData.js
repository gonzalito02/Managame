// esto es un ejemplo de que se puende crear funciones y demas para exportarlos como modulos y usarlos en otro archivo.

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('resultsData', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalSales: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    finantialInvestmentResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    qualityInvestment: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    loanInterest: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    extraResults: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    observations: {
      type: DataTypes.STRING,
    },
    totalPeriod: {
      type: DataTypes.INTEGER,
      get() {
        return this.totalSales + this.finantialInvestmentResults - this.loanInterest + this.extraResults  
      },
      set () {
        throw new Error('Do not try to set the totalPeriod value!');
      }
    },
    idControl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  });
};
