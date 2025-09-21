const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// List of 7 users with plaintext passwords
const usersToHash = [
  { email: 'vidya.com', password: '123456' },
  { email: 'f9@gmail.com', password: '123456' },
  { email: 'raj@email.com', password: '123456' },
  { email: 'a9@email.com', password: '123456' },
  { email: 'anya@email.com', password: '123456' },
  { email: 'maya@email.com', password: '123456' },
  { email: 'john@email.com', password: '123456' },
];

usersToHash.forEach(user => {
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) throw err;

    const sql = 'UPDATE users SET password = ? WHERE email = ?';
    connection.query(sql, [hash, user.email], (err, result) => {
      if (err) throw err;
      console.log(`Password updated for ${user.email}`);
    });
  });
});

// Close connection after a delay (wait for async hashes)
setTimeout(() => {
  connection.end();
  console.log('Done!');
}, 5000); // increased delay for 7 users
