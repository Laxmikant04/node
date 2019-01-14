// //npm modules
// const express = require('express');
// const uuid = require('uuid/v4')
// const session = require('express-session')
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const users = [
//   {id: '2f24vvg', username: 'test@test.com', password: 'password'}
// ]

// // configure passport.js to use the local strategy
// passport.use(new LocalStrategy(function(username,password,done){
//     let user =users[0];
//     if(username==user.username){
//       return done(null,user);
//     }else{
//       return done(null,false);
//     }
// }))

// // tell passport how to serialize the user
// passport.serializeUser((user, done) => {
//   console.log('Inside serializeUser callback. User id is save to the session file store here')
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log('Inside deserializeUser callback')
//   console.log(`The user id passport saved in the session file store is: ${id}`)
//   const user = users[0].id === id ? users[0] : false; 
//   done(null, user);
// });

// let isauthorized=function(req,res,next){
//   if(req.isAuthenticated()) {
//     next();
// } else {
//   return res.status(500).send('unauthorized cookie');
// }
// }
// // create the server
// const app = express();

// // add & configure middleware
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

// app.use(passport.initialize());
// app.use(passport.session());


// // create the homepage route at '/'
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback function')
//   console.log(req.sessionID)
//   res.send(`You hit home page!\n`)
// })

// app.post('/login',passport.authenticate('local'),
// function(req, res) {
//   console.log('Inside req.login() callback');
//   console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//   console.log(`req.user: ${JSON.stringify(req.user)}`)
//   return res.send(req.body);
// })

// app.get('/authrequired',isauthorized, (req, res) => {
//     return res.send('Inside GET /authrequired callback');
// })

// app.post('/nextpost',isauthorized, (req, res) => {
//   return res.send(req.body);
// })

// // tell the server what port to listen on
// app.listen(3000, () => {
//   console.log('Listening on localhost:3000')
// })