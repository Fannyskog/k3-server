const db = require("../database");
const res = require("express/lib/response");


function getMessage(room_name) {
    const sql = `SELECT * FROM messages WHERE room_name =?`;
    return new Promise((resolve, reject) => {
        db.all(sql, room_name, (error, room) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
            }
            res.status(200);
            resolve(room);
        });
    });
}


function addMessage({message, username, user_id, room_name, time}) {
    const sql = `INSERT INTO messages (message, username, user_id, room_name, time) VALUES (?, ?, ?, ? ,?)`;
    return new Promise((resolve, reject) => {
        db.all(sql, [message, username, user_id, room_name, time], (error) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
            }
            res.status(200);
            resolve();
        });
    });
}

function deleteMessage(room_name) {
    const sql = `DELETE FROM messages WHERE room_name =?`;
    return new Promise((resolve, reject) => {
        db.all(sql, room_name, (error, room) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
            }
            res.status(200);
            resolve(room);
        });
    });
}

module.exports = {
    getMessage,
    addMessage,
    deleteMessage
};
