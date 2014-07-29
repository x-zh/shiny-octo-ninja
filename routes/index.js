var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.send("hello");
});

router.get('/chat', function(req, res) {
  res.sendfile('views/chat.html');
});

router.get('/login', function(req,res){
    res.sendfile('views/login.html');
})

router.post('/login', 
	passport.authenticate('local', {successRedirect: '/', 
					failureRedirect: '/login',
					failureFlash: false })
);

router.get('/signup', function(req,res){
    res.sendfile('views/signup.html');
})

router.post('/signup', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username: username}),password, function(err, user){
	if(err){
	    res.sendfile('views/signup.html');
	    return false;
	}
	passport.authenticate('local')(req, res, function () {
          res.redirect('/');
	  });
    });
});

module.exports = router;
