// use 'nodemon server.js' to run the app


var express = require('express');
var bodyParser = require("body-parser");
var User = require('./models/user').User;
var cookieSession = require("cookie-session");


/* Intern Requires **/
var session_middleware = require("./middlewares/session_app");
var router_app = require("./routes/routes_app");

var app = express();

app.use('/public',express.static('public'));
app.use('/controllers',express.static('controllers'));
app.use('/modals',express.static('modals'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
	name: "session",
	keys: ["key-1", "key-2"]
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res){
	res.render('pages/login');
});

app.post("/startSession", function(req, res){
  User.findOne({username:req.body.username, password:req.body.password},function(err, doc) {
        if (doc){
            console.log('findOne data: ' + doc._id);
            req.session.user_id = doc._id;
            console.log('req.session.user_id: ' + req.session.user_id);
            res.redirect("app/");
        } else {
            console.log('Error post StartSession: ' + err);
        }
    });
});



/* STAY IN DASHBOARD if you are login */
app.get("/dashboard", function(req, res) {
	console.log("Loading dashboard");
	res.redirect("app/");
});



app.use("/app", session_middleware);
app.use("/app", router_app);



app.listen(8080);
console.log('Server running on 8080 ports');
