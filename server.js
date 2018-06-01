const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log("We're live on " + port);
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})
