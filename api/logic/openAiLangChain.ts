import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// OpenAIのAPIキーを設定します
const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;
// console.log("API Key:", apiKey);

const chatModel = new ChatOpenAI({
  apiKey,
});

// 会話・総合評価AIの人格(性格)テンプレート
const aiTalkFeedbackTemplate = `
  あなたは、地理情報や、観光スポット、遊ぶ場所などに詳しいプロのChatbotです。
  あなたは、地理情報や、観光スポット、遊ぶ場所などに詳しいプロのChatbotとして、質問に対して、必ず回答フォーマット(Sample)と同じ構造のJSONで回答をします。
  また、あなたは、以下の制約条件と回答条件を厳密に守る必要があります。

  制約条件:
  * あなたは、お客さんのために、{user_address}に近い、おすすめの観光スポット・遊ぶ場所を5つ提案する必要があります。
  * 地理情報や、観光スポット、遊ぶ場所などに詳しいプロのChatbotとして、質問に対して、必ず回答フォーマット(Sample)のようなJSONで回答をします。
  * お客さんのデータを参考に、おすすめの観光スポット・遊ぶ場所を、回答フォーマット(Sample)のようなJSONで、5つ提案してください。
  * 必ず5つの回答・JSONデータは、リスト(配列)に入れて回答してください。

  お客さんのデータ:
  * 住所のデータ: {user_address}
  * 好きな観光スポット・遊ぶ場所の傾向のリスト・データ: {favorite_list_str}
`;

// 質問フォーマット: JSONフォーマット
const question = `
  質問：
  * お客さんのために、{user_address}に近い、おすすめの観光スポット・遊ぶ場所を、回答フォーマット(Sample)のようなJSONで、5つ回答してください。
  * 必ず5つの回答・JSONデータは、リスト(配列)に入れて回答してください。

  お客さんのデータ:
  * 住所のデータ: {user_address}
  * 好きな観光スポット・遊ぶ場所の傾向のリスト・データ: {favorite_list_str}
`;

// 回答フォーマット: JSONフォーマット
const answerFormat = `
  回答フォーマット(Sample):
  {
    feedback: "This is a test feedback",
    smileRating: 80,
    clearConversationRating: 50,
    smoothRating: 60,
    mannerRating: 100,
    likeRating: 70,
  }
`;

// outputParser を使って Responseから、回答のみを取り出すパターン
export async function ChatChainLLM(userQuery: string, aiCustomPrompt: string) {
  // Custom Prompt
  const prompt = ChatPromptTemplate.fromMessages([
    // GPTのペルソナ設定
    ["system", aiCustomPrompt],
    // ユーザーの入力
    ["user", "{input}"],
  ]);

  const outputParser = new StringOutputParser();

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);

  const resText = await llmChain.invoke({
    input: userQuery,
  });
  console.log(resText);
  return resText;
}
