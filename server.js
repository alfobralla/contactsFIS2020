var express = require('express');
var bodyParser = require('body-parser');
const Contact = require('./contacts');
var BASE_API_PATH = "/api/v1";
var app = express(); //inicializa el servidor
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("<html><body><h1>This is my server</h1></body></html>");
});

app.get(BASE_API_PATH + "/contacts", (req,res)=>{
    console.log(Date() + " - GET a /contacts");
    Contact.find({},(err,contacts)=>{
        if (err){
            console.log(Date() + "-"+err);
            res.sendStatus(500);
        }else{
            res.send(contacts.map((contact)=>{
                return contact.cleanup();
            }));
        }
    });
});

app.post(BASE_API_PATH + "/contacts", (req,res)=>{
    console.log(Date() + " - POST a /contacts");
    var contact = req.body;
    //comprobacion de errores
    Contact.create(contact,(err)=>{
        if (err){
            console.log(Date() + "-"+err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    });
})