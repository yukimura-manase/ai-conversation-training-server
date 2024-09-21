const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// データベースファイルへのパスを指定して接続
const db = new sqlite3.Database('./db.sqlite');

// JSONボディのパースを有効にする
app.use(express.json());

// データベーステーブルの作成
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');
});

// ユーザーの追加 (CREATE)
app.post('/users', (req, res) => {
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
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

// 特定のユーザーの取得 (READ)
app.get('/users/:id', (req, res) => {
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
app.put('/users/:id', (req, res) => {
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
app.delete('/users/:id', (req, res) => {
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

// サーバーの開始
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
