const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { playerCreate } = require('./src/routes/functions/playerFunctions.js');
const { dataPlayer } = require("./initialdata.js");
const { gameControlCreate } = require('./src/routes/functions/adminControlFunctions.js');

// Syncing all the models at once.

// costo de un punto de calidad.
// tasa maxima de rendimiento de una inversión financiera.
// capital inicial global ?
// costo de produccion de los productos.
// tasa minima de costo de un prestamo.
// montos maximos de inversión y mínimo de producción.
// habilitaciones para comprar o enviar formularios.

function initial () {
  for (data of dataPlayer) {
    playerCreate(data)
  }
  console.log("initialPlayers function executed")
}

function gameControlInit () {
  gameControlCreate(
    {
      "period": 1,
      "qualityInvCost": 25000,
      "productionCapacity": 1000000,
      "costProdA": 20000,
      "costProdB": 10000,
      "costProdC": 5000,
      "minProductCapacity": 50,
      "minRateLoan": 0.20,
      "maxLoanAmount": 150000,
      "maxRateFinDinInvest": 0.4,
      "maxRateFinFixedInvest": 0.3,
      "maxTotalFinInvestAmount": 200000,
      "actionGame": "Production" // change to "market" for indicate the step of sales 
    }
  )
  console.log("gameControlInit executed")
}
// actions before start to set up the program

conn.sync({ force: true }).then(() => {
  server.listen(3002, () => {

    // first functions to execute ------------

    initial();
    gameControlInit()
    // ------------
    
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});