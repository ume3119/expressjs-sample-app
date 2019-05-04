var http = require("http");
var admin = require('firebase-admin');
var firebase = require("firebase/app");
var auth = require("firebase/auth");
var express = require('express'); //import express 
var app = express();
var bodyParser = require('body-parser');
const { User, Transaction } = require('./sequelize')

var path = __dirname + '/views/'; // this folder should contain your html files.
app.use(express.static(__dirname + '../node_modules/bootstrap/dist'));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ************************** //
// Services //
// ************************** //

app.get('/', function (req, res) {
   console.log("Get Request");
   res.send("Get Request");
 });

 app.get('/signin', function (req, res) {
   console.log("HTTP Get Request");
   res.render(path +'email-password.html');
 });

 app.post('/signin', function (req, res) {
   var email = req.body.email;
   var password = req.body.password;

    // Initialize Firebase
  //  firebase.initializeApp(firebaseConfig);

   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
   });

   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
         console.log(user.email);
      // User is signed in.
      } else {
      // No user is signed in.
      }
   });

   console.log(req.body.email);
   console.log("HTTP POST Request");
   res.send("200");
 });

 app.post('/register', function (req, res) {
   var email = req.body.email;
   var password = req.body.password;

  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    var user = firebase.auth().currentUser;
    User.create({email: user.email,password: password,credits: 1000.000});
    console.log(user.email);
    res.send(user);
  }, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage);
    console.log(errorMessage);
  });

  console.log("HTTP Get Request");
 });

app.get('/signout', function (req, res) {

  firebase.auth().signOut().then(function() {
   // Sign-out successful.
   console.log("Successfully Signed out");
    }).catch(function(error) {
   // An error happened.
    });
  console.log("HTTP Get Request");
  res.send("200");
});


app.get('/fetchAllUsers', function (req, res) {
  User.findAll().then(users => res.json(users))
});

app.post('/sendFirestore', function (req, res) {
  var email = req.body.email;
  var credits = req.body.credits;
  var docRef = firebaseDb.collection('transactions').doc('user_transaction_' + email + credits);
  var setAda = docRef.set({
    email: email,
    credits: credits
  });
  res.send("200");
});

app.post('/sendDatabase', function (req, res) {
  var email = req.body.email;
  var credits = req.body.credits;
  var user = User.findAll({where: {email: email} });
  user.then(Transaction.create({userId: user.id,credits: credits}));
});

// ************************** //
// Services //
// ************************** //


 //start server on port: 8080
var server = app.listen(8080, function () {

   var host = server.address().address;
   var port = server.address().port;
 
   console.log("server listening at http://%s:%s", host, port);
 });

//User your own credientials
var firebaseConfig = {
   apiKey: "",
   authDomain: "",
   databaseURL: "",
   projectId: "",
   storageBucket: "",
   messagingSenderId: "",
   appId: "1:849976167063:web:e0b9730e19fa2817"
 };

 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var serviceAccount = require("./passfolio-9ef13-firebase-adminsdk-6b890-c59162e398.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

var firebaseDb = admin.firestore();