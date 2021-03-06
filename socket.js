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
            if( 'gid' in socket && socket.uid in cs ){
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
    	    console.log('cs connected: '+uid);
    	});

    	socket.on('guest connected', function(data){
    	    var gid=data.gid;
    	    var uid=data.uid;
    	    guests[gid]={gid:gid, socket:socket};
            socket.gid=gid;
            socket.uid=uid;
    	    console.log('guest connected: '+gid);
    	});


    	socket.on('message', function(data){
            //TODO:ID should not be sent by socket, for security
    	    var msg = new Message({uid: data.uid, sid: data.gid, content: data.content, from: data.from});
    	    msg.save();
            console.log("new message");
    	    console.log(data);

    	    var uid=data.uid;
    	    var gid=data.gid;
    	    var from=data.from;
    	    //message from 0: guest, 1: customer service
    	    if(from==0){
                console.log(uid)
                if (uid in cs)
                    socket.to(cs[uid].socket.id).emit("message", data);
    	    }
    	    else{
                console.log(gid)
                if (gid in guests)
                    socket.to(guests[gid].socket.id).emit("message", data.content);
    	    }
    	})
    });
};


module.exports = socket;
