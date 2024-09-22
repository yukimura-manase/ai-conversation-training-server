const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { json } = require("express");
require("dotenv").config();

// OpenAIのAPIキーを設定します
const apiKey = process.env.OPEN_AI_API_KEY;
console.log("API Key:", apiKey);

const chatModel = new ChatOpenAI({
  apiKey,
});

// Escape function for curly braces
function escapeCurlyBraces(str) {
  return str.replace(/{/g, "{{").replace(/}/g, "}}");
}

// Your original answerFormat
const answerFormat = `
      回答フォーマット(Sample):
      {
        clearConversationRating: 50,
        smoothRating: 60,
        mannerRating: 100,
        smileRating: 80,
        likeRating: 70,
        feedback: "This is a test feedback",
      }
  `;

// outputParser を使って Responseから、回答のみを取り出すパターン
async function ChatChainLLM(talkLogList) {
  console.log("ChatChainLLM Called");
  console.log("talkLogList:", talkLogList);
  console.log("-------------------------------------------");

  // ユーザーの入力
  const userQuery = talkLogList.map((talkLog) => talkLog.userTalk).join("\n");
  const jsonUserQuery = JSON.stringify(userQuery);

  // AIからの回答
  const aiAnswer = talkLogList.map((talkLog) => talkLog.aiTalk).join("\n");
  const jsonAiAnswer = JSON.stringify(aiAnswer);

  // Escape the curly braces in answerFormat
  const escapedAnswerFormat = escapeCurlyBraces(answerFormat);

  // 会話・総合評価AIの人格(性格)テンプレート
  const aiTalkFeedbackTemplate = `
    あなたは、会話・コミュニケーションのプロであり、会話の評価を正しくするChatbotです。
    あなたは、会話・コミュニケーションのプロのChatbotとして、質問に対して、必ず回答フォーマット(Sample)と同じ構造のJSONで回答をします。
    また、あなたは、以下の制約条件と回答条件を厳密に守る必要があります。

    制約条件:
    * あなたは、会話・コミュニケーションのプロのChatbotとして、質問に対して、必ず回答フォーマット(Sample)のようなJSONで回答をします。
    * あなたは、お客さんのとの会話データ(Log)の文章から、コミュニケーションの明確さ (わかりやすい話をしているか)を%で評価します (0-100%)。JSONデータのclearConversationRatingに記載します。
    * あなたは、お客さんのとの会話データ(Log)の文章から、流れのスムーズさ(反応の迅速さと的確さ)を%で評価します (0-100%)。JSONデータのsmoothRatingに記載します。
    * あなたは、お客さんのとの会話データ(Log)の文章から、会話のトーンとマナー%で評価します (0-100%)。JSONデータのmannerRatingに記載します。
    * あなたは、お客さんのとの会話データ(Log)の文章から、笑顔度を%で評価します (0-100%)。JSONデータのsmileRatingに記載します。
    * あなたは、今までの評価の総合評価として、相互理解・仲良くなれたScore(好感度)を%で評価します (0-100%)。JSONデータのlikeRatingに記載します。
    * また、最後に総合評価のフィードバック文章を提供してください。JSONデータのfeedbackに記載します。
    
    * 必ず次のような6項目のJSONデータで、回答してください。
    ${escapedAnswerFormat}

    お客さんのとの会話データ(Log):
    * お客さんの話しかけた内容: ${jsonUserQuery}
    * あなたの回答: ${jsonAiAnswer}
    `;

  // 質問フォーマット: JSONフォーマット
  const question = `
      質問：
      あなたは、会話・コミュニケーションのプロであり、会話の評価を正しくするChatbotです。
      あなたは、会話・コミュニケーションのプロのChatbotとして、質問に対して、必ず回答フォーマット(Sample)と同じ構造のJSONで回答をします。

      制約条件:
      * あなたは、会話・コミュニケーションのプロのChatbotとして、質問に対して、必ず回答フォーマット(Sample)のようなJSONで回答をします。
      * あなたは、お客さんのとの会話データ(Log)の文章から、コミュニケーションの明確さ (わかりやすい話をしているか)を%で評価します (0-100%)。JSONデータのclearConversationRatingに記載します。
      * あなたは、お客さんのとの会話データ(Log)の文章から、流れのスムーズさ(反応の迅速さと的確さ)を%で評価します (0-100%)。JSONデータのsmoothRatingに記載します。
      * あなたは、お客さんのとの会話データ(Log)の文章から、会話のトーンとマナー%で評価します (0-100%)。JSONデータのmannerRatingに記載します。
      * あなたは、お客さんのとの会話データ(Log)の文章から、笑顔度を%で評価します (0-100%)。JSONデータのsmileRatingに記載します。
      * あなたは、今までの評価の総合評価として、相互理解・仲良くなれたScore(好感度)を%で評価します (0-100%)。JSONデータのlikeRatingに記載します。
      * また、最後に総合評価のフィードバック文章を提供してください。JSONデータのfeedbackに記載します。

      * 必ず次のような6項目のJSONデータで、回答してください。
      ${escapedAnswerFormat}

      お客さんのとの会話データ(Log):
      * お客さんの話しかけた内容: ${jsonUserQuery}
      * あなたの回答: ${jsonAiAnswer}
  `;

  // Custom Prompt
  const prompt = ChatPromptTemplate.fromMessages([
    // GPTのペルソナ設定
    ["system", aiTalkFeedbackTemplate],
    // ユーザーの入力
    ["user", "{input}"],
  ]);

  const outputParser = new StringOutputParser();

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);

  const resText = await llmChain.invoke({
    input: question,
  });
  console.log(resText);
  console.log("-------------------------------------------");
  return resText;
}

module.exports = {
  ChatChainLLM,
};
