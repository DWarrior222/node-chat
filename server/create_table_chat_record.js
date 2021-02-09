const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "49.235.241.244",
  user: "root",
  password: "Shuai2121.",
  database: 'chat'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  connection.query(
    "CREATE TABLE chat_record (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), cont VARCHAR(255))",
    (err, result) => {
    if (err) throw err;
    console.log("table created");
  });
});