var mongoose = require('mongoose');

var socket = function(server){
    var io = require('socket.io')(server);
    var Message = mongoose.model('Message');

    io.on('connection', function(socket){
	console.log('user connected');
	socket.on('message', function(data){
	    var msg = new Message({uid: data.uid, sid: socket.id, content: data.msg});
	    console.log(msg);
	    msg.save();
	})
    });
};


module.exports = socket;
