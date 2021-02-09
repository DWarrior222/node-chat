const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "49.235.241.244",
  user: "root",
  password: "Shuai2121."
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  connection.query(
    "CREATE DATABASE chat", (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});