var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    createdOn: {
	type: Date, 
	default: Date.now 
    } 
});

UserSchema.methods.validPassword = function ( password ){
    return password == this.password;
}

mongoose.model('User', UserSchema);




