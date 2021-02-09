const mysql = require('mysql2');

const connection =  mysql.createConnection({
  host: "49.235.241.244",
  user: "root",
  password: "Shuai2121.",
  database: 'chat'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  connection.query("DROP TABLE chat_record",
  (err, result) => {
    if (err) throw err;
    console.log('Table deleted');
  });
});