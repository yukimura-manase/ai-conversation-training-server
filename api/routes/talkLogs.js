const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS talkLogs (
      talkLogId TEXT PRIMARY KEY,
      chatRoomId INTEGER,
      userTalk TEXT,
      aiTalk TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `);
});

// レコードの追加 (POST)
router.post("/", (req, res) => {
  const { chatRoomId, userTalk, aiTalk } = req.body;
  const talkLogId = uuidv4();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  db.run(
    `INSERT INTO talk_logs (talkLogId, chatRoomId, userTalk, aiTalk, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
    [talkLogId, chatRoomId, userTalk, aiTalk, createdAt, updatedAt],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3008");
      res.status(201).json({ talkLogId });
    }
  );
});

// 全レコードの取得 (GET)
router.get("/", (req, res) => {
  db.all("SELECT * FROM talk_logs", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ talk_logs: rows });
  });
});

// 特定のレコードの取得 (GET)
router.get("/:talkLogId", (req, res) => {
  const { talkLogId } = req.params;
  db.get(
    "SELECT * FROM talk_logs WHERE talkLogId = ?",
    [talkLogId],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (row) {
        res.json({ talkLog: row });
      } else {
        res.status(404).json({ error: "Talk log not found" });
      }
    }
  );
});

module.exports = router;
