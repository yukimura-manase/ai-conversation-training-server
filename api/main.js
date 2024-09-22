const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// データベースの作成・接続（共有するためにここで作成してもOK）
const db = new sqlite3.Database('./db.sqlite');

// JSONボディのパースを有効にする
app.use(express.json());

// users
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// talk_logs
const talkLogsRouter = require('./routes/talkLogs');
app.use('/talk_logs', talkLogsRouter);

// サーバーの開始
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
