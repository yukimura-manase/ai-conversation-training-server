const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");
const { ChatChainLLM } = require("../logic/openAiLangChain");

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS aiFeedback (
      feedbackId TEXT PRIMARY KEY,
      userId TEXT,
      chatRoomId TEXT,
      feedback TEXT,
      smileRating INTEGER,
      clearConversationRating INTEGER,
      smoothRating INTEGER,
      mannerRating INTEGER,
      likeRating INTEGER
    )
  `);
});

// レコードの追加 (POST)
router.post("/", (req, res) => {
  const {
    userId,
    chatRoomId,
    feedback,
    smileRating,
    clearConversationRating,
    smoothRating,
    mannerRating,
    likeRating,
  } = req.body;

  const feedbackId = uuidv4();

  db.run(
    `INSERT INTO aiFeedback (feedbackId, userId, chatRoomId, feedback, smileRating, clearConversationRating, smoothRating, mannerRating, likeRating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      feedbackId,
      userId,
      chatRoomId,
      feedback,
      smileRating,
      clearConversationRating,
      smoothRating,
      mannerRating,
      likeRating,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ feedbackId });
    }
  );
});

// 特定のレコードの取得 (GET)
router.get("/:chatRoomId", async (req, res) => {
  const { chatRoomId } = req.params;

  db.all(
    "SELECT * FROM aiFeedback WHERE chatRoomId = ?",
    [chatRoomId],
    async (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (rows) {
        // 今までのチャットルームでの会話ログから、AIのフィードバックを取得する (関数置き換え予定)
        const aiFeedback = await ChatChainLLM(rows);

        // TODO: 2. DBに保存する
        res.json({ feedback: aiFeedback });
      } else {
        res.status(404).json({ error: "Feedback not found" });
      }
    }
  );
});

module.exports = router;
