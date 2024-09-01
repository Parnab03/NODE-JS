const fs = require("fs");

const logRequest = (req, res, next) => {
    fs.writeFile(
        "log.txt",
        `[${new Date().toLocaleString()}] Request received at: ${
            req.originalUrl
        }`,
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully");
            }
        }
    );
    next();
};

module.exports = logRequest;