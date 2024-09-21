const express = require('express');
const router = express.Router();

// データベースの準備
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

// ユーザーの追加 (CREATE)
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// ユーザーの取得 (READ)
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// 特定のユーザーの取得 (READ)
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({ user: row });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// ユーザーの更新 (UPDATE)
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ updated: this.changes });
    }
  });
});

// ユーザーの削除 (DELETE)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

module.exports = router;
