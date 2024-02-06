const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./nicophoto.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = db;