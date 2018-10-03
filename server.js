var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(cors());

var port = process.env.PORT || 8081;

var router = express.Router();

// connection to MySQL DB
var myConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traseable'
});

myConnection.connect();

//middleware to use for all requests
router.use(function(req, res, next){
    console.log('something is happening.');
    next(); // make sure we go to the next routes and not stop here
});

router.get('/', function(req, res){
    res.json({message: 'Welcome to API'});
});


app.use('/api', router);

app.listen(port);

console.log('API on Port'+port);

var routes = require('./userRoutes');
routes(app);

