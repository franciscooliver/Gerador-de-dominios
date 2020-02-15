const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "namegator",
  port: "3306",
  insecureAuth: true
});

connection.connect();

exports.execute = (query, values) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results, fields) => {
      if (error) reject(error);
      else {
        resolve(results);
      }
    });
  });
};
