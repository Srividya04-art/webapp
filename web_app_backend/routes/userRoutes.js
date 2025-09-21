const express = require('express');
const router = express.Router();
const connection = require('../db');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/me', authMiddleware, (req, res) => {
  const userId = req.user.id;

  const sqlUser = 'SELECT id, name, email, bio, profile_pic FROM users WHERE id = ?';
  const sqlPosts = 'SELECT * FROM posts WHERE author_id = ? ORDER BY created_at DESC';

  connection.query(sqlUser, [userId], (err, userResults) => {
    if (err) return res.status(500).json(err);
    if (!userResults[0]) return res.status(404).json({ message: 'User not found' });

    connection.query(sqlPosts, [userId], (err, postsResults) => {
      if (err) return res.status(500).json(err);

      
      res.json({
        user: {
          id: userResults[0].id,
          name: userResults[0].name,
          email: userResults[0].email,
          bio: userResults[0].bio || '',
          profile_pic: userResults[0].profile_pic || ''
        },
        posts: postsResults
      });
    });
  });
});


router.put('/me', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { name, bio, profile_pic } = req.body;

  const sql = 'UPDATE users SET name = ?, bio = ?, profile_pic = ? WHERE id = ?';
  connection.query(sql, [name, bio, profile_pic, userId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Profile updated successfully!' });
  });
});

module.exports = router;
