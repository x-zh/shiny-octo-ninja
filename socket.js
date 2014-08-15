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
	    console.log("someone left\n");
	    for(var i in guests){
		if( guests[i].socket ===socket ){
		    delete guests[i];
		}
	    }

	    for(var i in cs){
		if( cs[i].socket ===socket ){
		    delete cs[i];
		}
	    }
	});
	socket.on('cs connected', function(uid){
	    cs[uid]={uid:uid, socket:socket};
	    console.log(Object.keys(cs));
	});

	socket.on('guest connected', function(){
	    //gid = generateGuestId();
	    var gid=socket.id;
	    socket.emit('guestID', gid);
	    guests[gid]={gid:gid, socket:socket};
	    console.log(Object.keys(guests));
	});


	socket.on('message', function(data){
	    var msg = new Message({uid: data.uid, sid: socket.id, content: data.msg, from: data.from});
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
