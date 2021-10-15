const mysql = require('mysql2');

const pool =  mysql.createPool({
  host: "49.235.241.244",
  user: "root",
  password: "Shuai2121.",
  database: 'chat',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected!");
// });


function insertRecord({ name, cont }) {
  pool.query(
    `INSERT INTO chat_record (name, cont) VALUES ('${name}', '${cont}')`,
    (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
}

function getRecord({ start, end }) {
  return new Promise((resolve, reject) => {
    pool.query(
      // `SELECT * FROM chat_record WHERE id >= ${start} AND id <= ${end};`,
      `SELECT * FROM chat_record`,
      (err, result) => {
      if (err) resolve([]);
      console.log("1 record get");
      resolve(result);
    });
  })
}

module.exports = {
  insertRecord,
  getRecord
}