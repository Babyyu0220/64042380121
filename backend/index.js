require('dotenv').config()
var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABESE
});

var app = express()

app.use(cors())

app.get('/Register', function (req, res, next) {
  res.json({msg: 'hi, Register'})
})

app.get('/user', function (req, res, next) {
    //simple query
    connection.query(
        'SELECT * FROM `user`',
        function(err, results, fields) {
            res.json(results)
        }
    );
  })


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})