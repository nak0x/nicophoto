const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('./database/db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});


// Créez les tables dans la commande ci-dessous
sql = ``;
db.run(sql)