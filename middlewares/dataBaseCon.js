// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'movies_db'
});

// simple query
connection.query(
  'SELECT title AS Titulo, name AS Genero FROM series s INNER JOIN genres g ON s.genre_id = g.id',
  function(err, results, fields) {
    if (err) {
        console.log('>>> [err]', err);
    }
    console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  }
);