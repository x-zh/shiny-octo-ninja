var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var User = mongoose.model('User');

var passport = require('passport');



function requireLogin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/', function(req, res) {
    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    else{
        res.render('index');
    }
});

router.get('/chat', function(req, res) {
    res.render('chat', {gid: req.sessionID, uid:1});
});

router.get('/login', function(req,res){
    res.sendfile('views/login.html');
})

router.post('/login', 
	passport.authenticate('local', { 
                    failureRedirect: '/login',
					failureFlash: false 
                }),
    function(req,res) {
        res.redirect('/');
    }
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

router.get('/logout', function(req,res){
    console.log(req.user);
    if(req.isAuthenticated()){
        req.logout();
    }
    res.redirect('/');
})

router.get('/chat-cs', requireLogin, function(req,res){
    res.render('chat-cs', {uid:req.user._id});
})


router.get('/home', requireLogin, function(req, res) {
    res.render('home', { user:req.user });
});



module.exports = router;
