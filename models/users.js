var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    createdOn: {
	type: Date, 
	default: Date.now 
    } 
});

UserSchema.plugin(passportLocalMongoose);


mongoose.model('User', UserSchema);




