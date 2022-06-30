const db = require("../database");
const res = require("express/lib/response");

function getUsers() {
    const sql = `SELECT * FROM users`
    return new Promise((resolve, reject) => {
        db.all(sql, (error, user) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
            }
            res.status(200);
            resolve(user);
        });
    });
}

function getUser(id) {
    const sql = `SELECT * FROM users WHERE id=?`
    return new Promise((resolve, reject) => {
        db.get(sql, id,(error, user) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
            }
            res.status(200);
            resolve(user);
        });
    });
}


module.exports = { 
    getUsers,
    getUser 
}