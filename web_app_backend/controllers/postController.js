const connection = require('../db');

const getPosts = (req, res) => {
  const sql = 'SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.author_id = users.id ORDER BY created_at DESC';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id;

  const sql = 'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)';
  connection.query(sql, [title, content, author_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Post created successfully!', id: result.insertId });
  });
};

const updatePost = (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND author_id = ?';
  connection.query(sql, [title, content, id, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(403).json({ message: 'Not authorized' });
    res.json({ message: 'Post updated successfully!' });
  });
};

const deletePost = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const sql = 'DELETE FROM posts WHERE id = ? AND author_id = ?';
  connection.query(sql, [id, userId], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(403).json({ message: 'Not authorized' });
    res.json({ message: 'Post deleted successfully!' });
  });
};

module.exports = { getPosts, createPost, updatePost, deletePost };
