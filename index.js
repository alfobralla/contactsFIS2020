var express = require('express');
var bodyParser = require('body-parser');

var port = 3000;
var BASE_API_PATH = "/api/v1";

var contacts = [
    {"name":"alfonso","phone":"123"},
    {"name":"isabel","phone":"789"}
];

console.log("Starting server...");

var app = express(); //inicializa el servidor
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("<html><body><h1>My server</h1></body></html>");
});

app.get(BASE_API_PATH + "/contacts", (req,res)=>{
    console.log(Date() + " - GET a /contacts");
    res.send(contacts);
});

app.post(BASE_API_PATH + "/contacts", (req,res)=>{
    console.log(Date() + " - POST a /contacts");
    var contact = req.body;
    contacts.push(contact);
    res.sendStatus(201);
})

app.listen(port);

console.log("server ready");