var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    uid: Number,
    sid: String,
    content: String,
    createdOn: {
	type: Date, 
	default: Date.now 
    },
    //message from 0: guest, 1: customer service
    from: Number, 
});

mongoose.model('Message', MessageSchema);
