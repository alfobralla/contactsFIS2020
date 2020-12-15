const app = require('./server.js');
const dbConnect = require('./db');

var port = (process.env.PORT || 3000);

console.log("Starting server at..." + port);

dbConnect().then(
    () => {
        app.listen(port);
        console.log("server ready");
    },
    err => {
        console.log("Connection error: "+err);
    }
);