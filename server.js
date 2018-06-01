const express = require('express');
const login = require('./routes/loginroutes');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var router = express.Router();

app.get('/', function(req, res) {
  res.send("Hello");
});

//API Home
router.get('/', function(req, res) {
  res.json({ message : 'welcome to the api' });
});

//handle registration
router.post('/register', login.register);
router.post('/login', login.login);

app.use('/api', router);

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log("We're live on " + port);
});
