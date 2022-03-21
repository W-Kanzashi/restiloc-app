const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Ashley13",
  database: "restiloc",
});

// Starting our app.
const app = express();

app.use(bodyParser.json());
app.use(cors());

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Creating a GET route that returns data from the 'users' table.
app.get("/cars", function (req, res) {
  connection.query("SELECT * FROM vehicule", function (error, results, fields) {
    if (error) throw error;
    console.log(fields);
    console.log(results);
  });
  res.send(results);
  connection.end();
});

// Starting our server.
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/cars so you can see the data.");
});
