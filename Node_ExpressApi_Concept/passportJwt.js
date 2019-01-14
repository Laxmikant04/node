//npm modules
const express = require('express');
var jwt = require("jwt-simple"); 
const bodyParser = require('body-parser');
var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var ExtractJwt = passportJWT.ExtractJwt;  
var JWTStrategy = passportJWT.Strategy;  
var params = {  
  secretOrKey: "jwtSecret",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


const users = [
  {id: '2f24vvg', username: 'test@test.com', password: 'password'}
]

// configure passport.js to use the local strategy
passport.use(new JWTStrategy(params,function(payload, done){
    var user = users[0] || null;
    if (user) {
        return done(null, {
            id: "user.id"
        });
    } else {
        return done(new Error("User not found"), null);
    }
}))

// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());

// create the homepage route at '/'
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})

app.post('/firstcall',
function(req, res) {
  let user =users[0];
  var payload = {
    id1: user.id
  };
  var token = jwt.encode(payload, "jwtSecret");
         return  res.json({
                token: token
            });
})

app.get('/authrequired',passport.authenticate('jwt',{session: false}), (req, res) => {
    return res.json(users[req.user.id]);
})

app.post('/nextpost',isauthorized, (req, res) => {
  return res.send(req.body);
})

// tell the server what port to listen on
app.listen(3000, () => {
  console.log('Listening on localhost:3000')
})