var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    uid: Number,
    sid: String,
    content: String,
    createdOn: {
	type: Date, 
	default: Date.now 
    } 
});

mongoose.model('Message', MessageSchema);
