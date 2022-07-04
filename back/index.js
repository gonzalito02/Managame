const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { playerCreate } = require('./src/routes/functions/playerFunctions.js');
const { dataPlayer } = require("./initialdata.js")

// Syncing all the models at once.

function initial () {
  for (data of dataPlayer) {
    playerCreate(data)
  }
  console.log("initial function executed")
}
// actions before start to set up the program

conn.sync({ force: true }).then(() => {
  server.listen(3002, () => {

    // funciones a ejecutarse al inicio ------------

    initial();
    
    // ------------
    
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});