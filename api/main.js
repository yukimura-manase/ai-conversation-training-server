const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const cors = require("cors");
const port = 3000;

// データベースの作成・接続（共有するためにここで作成してもOK）
const db = new sqlite3.Database("./db.sqlite");

// CORSの設定
app.use(cors());

// JSONボディのパースを有効にする
app.use(express.json());

// users
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// talk_logs
const talkLogsRouter = require('./routes/talkLogs');
app.use('/talk_logs', talkLogsRouter);

// ai_feedback
const aiFeedbackRouter = require('./routes/aiFeedback');
app.use('/ai_feedback', aiFeedbackRouter);

// サーバーの開始
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
