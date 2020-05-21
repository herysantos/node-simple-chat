var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var dbUrl = 'mongodb+srv://root:myrootpass@cluster0-dovuy.mongodb.net/test?retryWrites=true&w=majority';

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