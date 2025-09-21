const connection = require('../db');

const getMe = (req, res) => {
  const userId = req.user.id;

  const sqlUser = 'SELECT id, name FROM users WHERE id = ?';
  const sqlPosts = 'SELECT id, title, content, created_at FROM posts WHERE author_id = ? ORDER BY created_at DESC';

  connection.query(sqlUser, [userId], (err, userResults) => {
    if (err) return res.status(500).json(err);
    if (!userResults[0]) return res.status(404).json({ message: 'User not found' });

    connection.query(sqlPosts, [userId], (err, postsResults) => {
      if (err) return res.status(500).json(err);
      // Always return 'name' and 'posts'
      res.json({ name: userResults[0].name, posts: postsResults });
    });
  });
};

module.exports = { getMe };
