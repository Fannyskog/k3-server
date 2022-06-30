const db = require("../database");
const res = require("express/lib/response");

function allRooms() {
    const sql = "SELECT * FROM rooms"
return new Promise((resolve, reject) => {
    db.all(sql, (error, room) => {
      if(error) {
        console.error(error.message);
        res.status(400);
        reject(error);
        
      }
      res.status(200); 
      resolve(room);
       
    });
});}

function getRoom(id) {
    const sql = "SELECT * FROM rooms WHERE id=?";
    return new Promise((resolve, reject) => {
        db.get(sql,id, (error, room) => {
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
function createRoom(name) {
    const sql = "INSERT INTO rooms (room_name) VALUES (?)";
    return new Promise((resolve, reject) => {
        db.run(sql, name, (error) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
                
              }
              res.status(200); 
              resolve(name);
               
                
            
            });
        });   
}

function deleteRoom(room_name) {
    const sql = "DELETE FROM rooms WHERE room_name = ?";
    return new Promise((resolve, reject) => {
        db.run(sql, room_name, (error) => {
            if (error) {
                console.error(error.message);
                res.status(400);
                reject(error);
            }
            res.status(200);
            resolve(room_name);
        });
    });
}
 


module.exports = {
    allRooms,
    getRoom, 
    createRoom,
    deleteRoom
}