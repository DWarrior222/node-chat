const mysql = require('mysql2');
let isConnecting = false;

const connection =  mysql.createConnection({
  host: "49.235.241.244",
  user: "root",
  password: "Shuai2121.",
  database: 'chat'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  isConnecting = true;
});


function insertRecord({ name, cont }) {
  if (!isConnecting) return;
  connection.query(
    `INSERT INTO chat_record (name, cont) VALUES ('${name}', '${cont}')`,
    (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function getRecord({ start, end }) {
  return new Promise((resolve, reject) => {
    connection.query(
      // `SELECT * FROM chat_record WHERE id >= ${start} AND id <= ${end};`,
      `SELECT * FROM chat_record`,
      (err, result) => {
      if (err) reject(err);
      console.log("1 record get");
      resolve(result);
    });
  })
}

module.exports = {
  insertRecord,
  getRecord
}