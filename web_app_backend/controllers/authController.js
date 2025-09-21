const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { name, email, password, bio, profile_pic } = req.body;


  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json(err);

    const sql = 'INSERT INTO users (name, email, password, bio, profile_pic) VALUES (?, ?, ?, ?, ?)';
connection.query(sql, [name, email, hash, bio || '', profile_pic || ''], (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'User registered successfully!' });
});

  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  connection.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

      const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: results[0].id, name: results[0].name, email: results[0].email } });
    });
  });
};

module.exports = { register, login };
