var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');

var port = 3000;
var BASE_API_PATH = "/api/v1";
var DB_FILE_NAME = __dirname + "/contacts.json;"

console.log("Starting server...");

var app = express(); //inicializa el servidor
app.use(bodyParser.json());

//inicializa BD de nebd
var db = new DataStore({
    filename: DB_FILE_NAME,
    autoload:true
});

app.get("/", (req,res)=>{
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/contacts", (req,res)=>{
    console.log(Date() + " - GET a /contacts");
    db.find({},(err,contacts)=>{
        if (err){
            console.log(Date() + "-"+err);
            res.sendStatus(500);
        }else{
            res.send(contacts.map((contact)=>{
                delete contact._id;
                return contact;
            }));
        }
    });
});

app.post(BASE_API_PATH + "/contacts", (req,res)=>{
    console.log(Date() + " - POST a /contacts");
    var contact = req.body;
    //comprobacion de errores
    db.insert(contact,(err)=>{
        if (err){
            console.log(Date() + "-"+err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    });
})

app.listen(port);

console.log("server ready");