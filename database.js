const sqlite3 = require("sqlite3").verbose();

const  db = new sqlite3.Database("./db.sqlite", (error) => {
    if(error) {
        console.error(error.message);
        throw error;
    }
    console.log("Connected to database");
})

const roomState = `CREATE TABLE IF NOT EXISTS rooms
( id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_name TEXT UNIQUE )`;
   
const userState = `CREATE TABLE IF NOT EXISTS users
( id TEXT,
   username TEXT PRIMARY KEY )`;
   

const messageState = `CREATE TABLE IF NOT EXISTS message
( id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    username TEXT,
    room_name TEXT,
    user_id TEXT,
    time TEXT )`;


db.run(roomState, (error) => {
    if(error) {
        console.error(error.message);
    };
});

db.run(userState, (error) => {
    if(error) {
        console.error(error.message);
    };
});

db.run(messageState, (error) => {
    if(error) {
        console.error(error.message);
    };
});



module.exports = db;
