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

UserSchema.methods.validPassword = function ( password ){
    return password == this.password;
};

mongoose.model('User', UserSchema);




