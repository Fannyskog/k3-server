const fs = require("fs");

function loggMessage(data) {
    const fsData = JSON.stringify(data);
    if (data.message) {
        fs.appendFile("log.txt", fsData + "\n", (error) => {
            if (error) {
                return console.log("Failed to logg");
            } else {
                return console.log("Messages logged");

            }
            });
    }};

module.exports = loggMessage;    