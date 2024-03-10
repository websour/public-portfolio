import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function POST(request: Request) {
  const input = await request.text();

  const API_KEY: string | undefined = process.env.GENERATIVE_AI_CODE || '';
  let prompt = `質問内容「${input}」\n以下のテンプレートをカスタマイズして回答を生成してください。\n技術やスキルについて質問された場合、スキルセットから適切なスキルや経験を選択し、記載の無い情報は無視してください。\n※記載のある情報のみ回答に含めてください。\n回答: 「[技術]については、[経験年数]年以上の経験があります。特に[技術]に関しては、[技術の特徴]」\n`;
  const data = {
    skills: [
      {
        skill: "HTML/CSS (SCSS)",
        experience: "9年以上",
        features: "レスポンシブでアクセスしやすいウェブサイトの構築。SCSSを使用してスタイルを効率的かつ組織的に管理。"
      },
      {
        skill: "JavaScript",
        experience: "9年以上",
        libraries: "jQuery",
        frameworks: "Vue.js、Angular、 React.js",
        features: "ライブラリとフレームワークを用いた開発。Vue.jsやReact.jsの理解とオブジェクト指向プログラミングの原則の適用。"
      },
      {
        skill: "PHP",
        experience: "9年以上",
        features: "CodeIgniter、WordPress、Laravelなどのフレームワークを用いた開発。セキュアでスケーラブルなバックエンドシステムの構築と効率的な開発プロセスを実現。"
      },
      {
        skill: "C#",
        experience: "1年半",
        features: "デスクトップアプリケーションとゲームの開発。.NETフレームワークの理解とオブジェクト指向プログラミングの原則の適用。"
      },
      {
        skill: "MySQL",
        experience: "5年",
        features: "データベース設計、最適化、セキュリティ対策の深い知識。SQLクエリの最適化から複雑なデータマイグレーションまで、幅広いスキルを活用。"
      },
      {
        skill: "Vagrant & Docker",
        experience: "5年以上",
        features: "開発環境の構築と管理の効率化。プロジェクトチーム全体での環境の統一と、アプリケーションのデプロイメントプロセスの簡素化、CI/CDパイプラインの構築に貢献。"
      }
    ],
    self_pr: "フロントエンド開発者として、HTML、CSS、JavaScript、PHPを駆使したウェブサイトの設計、構築、運用に広範囲なスキルを有している。アクセシビリティとユーザビリティを重視したUI・UX設計に注力し、ユーザーにとって使いやすいウェブサイトの開発に努めてきた。モダンなJavaScriptフレームワークを使用したプロジェクトに積極的に関わり、幅広いプロジェクトに貢献。開発チームとの密接な協力により、効率的かつ効果的なソリューションを実現。ユーザー中心の設計を追求し、アクセシビリティとユーザビリティに優れたサイトやアプリケーション開発を目指している。",
    work_history: "大学を卒業後、求人の営業職を1年勤めたのち、制作会社でWEBデザイナー、フロントエンドエンジニアを経験。2018年よりインターネット関連事業にて、フロントエンドエンジニアとして勤務。"
  };
  
  prompt += `- **スキルセット**:\n`;
  data.skills.forEach(skill => {
    prompt += `${skill.skill}\n実務経験: ${skill.experience}\n特徴: ${skill.features}\n`;
  });
  
  prompt += `職歴について質問された場合は、以下の概要を出力してください。\n`;
  prompt += `職歴\n概要: ${data.work_history}\n`;
  prompt += `記載されている情報のみ回答し、その他は記載しない。\n該当しない場合は、「お答えできません」と回答すること`;

  const MODEL_NAME = "gemini-1.0-pro";

  if (!API_KEY) {
    throw new Error("APIキーが設定されていません。");
  }

  const genAI = new GoogleGenerativeAI(API_KEY as string);
  const model = genAI.getGenerativeModel({ model:MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
    safetySettings,
  });

  function markdownToText(markdown: string) {
    return markdown
      .replace(/^\* /gm, '') 
      .replace(/\n/g, ' '); 
  }
 
  const responseData = await result.response.text();

  const plainText = markdownToText(responseData);
  return new Response(JSON.stringify(plainText), {
    headers: { 'Content-Type': 'application/json' },
  });
}