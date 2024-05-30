const sqlite3 = require('sqlite3').verbose();
const dbName = 'user.db';

let db = new sqlite3.Database(dbName, (err)=>{
    if (err) return console.error(err.message);
});

db.run('CREATE TABLE IF NOT EXISTS users (email TEXT NOT NULL PRIMARY KEY, password TEXT NOT NULL)', (err)=>{
    if (err) return console.error(err.message);
});

module.exports = db;