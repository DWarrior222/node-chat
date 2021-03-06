const mysql = require('mysql2');
let isConnecting = false;
const isProp = process.env.NODE_ENV === 'prop'

const connection =  mysql.createConnection({
  host: isProp ? "localhost" : "49.235.241.244",
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
  if (!isConnecting) return;
  connection.query(
    `SELECT * FROM pet WHERE id >= ${start} AND id <= ${end};`,
    (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

module.exports = {
  insertRecord
}