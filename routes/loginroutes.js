var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node',
  port: 8889
});

connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting to db");
  }
});


exports.register = function(req,res){
  console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name": req.headers.first_name,
    "last_name": req.headers.last_name,
    "email": req.headers.email,
    "password": req.headers.password,
    "created": today,
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code": 400,
      "failed": "error ocurred"
    })
  } else {
    console.log('The solution is: ', results);
    res.send({
      "code": 200,
      "success": "user registered sucessfully"
        });
  }
  });
}

exports.login = function(req, res) {
  var email = req.headers.email;
  var password = req.headers.password;
  connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "Error Occurred"
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == password) {
          res.send({
            "code": 200,
            "sucess": "login successful"
          });
        } else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      } else {
        res.send({
          "code": 204,
          "success": "Email doens't exist"
        });
      }
    }
  })
}
