var mongoose = require('mongoose');
var Message = mongoose.model('Message');


var generateGuestId = function(){

}

var socket = function(server){
    var io = require('socket.io')(server);

    var guests={};
    var cs={};

    io.on('connection', function(socket){

	socket.on('disconnect', function  () {
        if( 'gid' in socket ){
        //guest disconnect,
            socket.to(cs[socket.uid].socket.id).emit("guest disconnect", socket.gid); 
            delete guests[socket.gid];
	        console.log("guest left, gid: "+socket.gid);
        }
        else{
        //cs disconnect
            delete cs[socket.uid];
	        console.log("cs left, uid: "+socket.uid);
        }
	});
	socket.on('cs connected', function(uid){
	    cs[uid]={uid:uid, socket:socket};
        socket.uid=uid;
	    console.log(Object.keys(cs));
	});

	socket.on('guest connected', function(data){
	    var gid=data.gid;
	    var uid=data.uid;
	    guests[gid]={gid:gid, socket:socket};
        socket.gid=gid;
        socket.uid=uid;
	    console.log(Object.keys(guests));
	});


	socket.on('message', function(data){
        //TODO:ID should not be sent by socket, for security
	    var msg = new Message({uid: data.uid, sid: data.gid, content: data.content, from: data.from});
	    console.log(data);
	    msg.save();

	    var uid=data.uid;
	    var gid=data.gid;
	    var from=data.from;
	    //message from 0: guest, 1: customer service
	    if(from==0){
		socket.to(cs[uid].socket.id).emit("message", data);
	    }
	    else{
		socket.to(guests[gid].socket.id).emit("message", data.content);
	    }

	})
    });
};


module.exports = socket;
