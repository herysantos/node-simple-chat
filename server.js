const port = process.env.PORT || 3000;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
var server = app.listen(port);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var dbUser = process.env.DB_USER;
var dbPass = process.env.DB_PASS;
var dbHost = process.env.DB_HOST;



var dbUrl = "mongodb+srv://"+dbUser+":"+dbPass+"@"+dbHost+"/test?retryWrites=true&w=majority";
console.log("DB_URL is"+dbUrl);
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
})

io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})

module.exports = app;
