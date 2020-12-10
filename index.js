var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path'); 
app.use(express.static(path.join(__dirname, 'node_modules')));//指定app使用该静态路径
app.use(express.static(path.join(__dirname, 'staticfile')));//指定app使用该静态路径

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  setInterval(() => {
    let now = +new Date();
    let nowArr = []
    for (let i = 0; i < 1000; i++) {
      nowArr.push(now)
    }
    
    let arr = new Array(24).fill(nowArr)
    
    console.log("🚀 ~ file: index.js  ~ now", arr[0][0])

    
    io.emit('chat message', arr);
    // socket.on('chat message', function(msg){
    // });
  }, 100);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
