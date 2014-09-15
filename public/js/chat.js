var socket = io('http://localhost:3000');

socket.on("connect", function(){
    //register this socket
	socket.emit("guest connected", {gid:$('#gid').val(), uid: $('#uid').val()});
    /*
    socket.on("guestID", function(data){
	$("#gid").val(data);
	console.log("got gid"+data);
    });
    */
    socket.on("message", function(msg){
		$('#messages').append($('<li>').text(msg));
    });
})

$(function(){
    $('form').submit(function(){
    var msg = $("#m").val();
    socket.emit("message", {content: msg, uid:$("#uid").val(), gid:$("#gid").val(), from:0});
    $('#messages').append($('<li>').text(msg));
    $("#m").val('');
    return false;
    });
})
