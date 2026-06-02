const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
const heroCard = document.getElementById("heroCard");
const cinemaCard = document.getElementById("cinemaCard");
const cinemaTitle = document.getElementById("cinemaTitle");
const cinemaLine = document.getElementById("cinemaLine");
const questionForm = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const questionEcho = document.getElementById("questionEcho");
const deckScene = document.getElementById("deck");
const deckTitle = document.getElementById("deckTitle");
const deckStatus = document.getElementById("deckStatus");
const twelveRing = document.getElementById("twelveRing");
const spreadTrack = document.getElementById("spreadTrack");
const energyOrb = document.getElementById("energyOrb");
const selectionStrip = document.getElementById("selectionStrip");
const gestureStart = document.getElementById("gestureStart");
const gestureVideo = document.getElementById("gestureVideo");
const gestureStatus = document.getElementById("gestureStatus");
const destinyConfirmation = document.getElementById("destinyConfirmation");
const readingCards = document.getElementById("readingCards");
const readingTitle = document.getElementById("readingTitle");
const readingKeywords = document.getElementById("readingKeywords");
const careerText = document.getElementById("careerText");
const loveText = document.getElementById("loveText");
const studyText = document.getElementById("studyText");
const adviceText = document.getElementById("adviceText");
const posterCanvas = document.getElementById("posterCanvas");
const posterCtx = posterCanvas.getContext("2d");
const posterEyebrow = document.getElementById("posterEyebrow");
const posterTitle = document.getElementById("posterTitle");
const posterHint = document.getElementById("posterHint");
const downloadPoster = document.getElementById("downloadPoster");
const saveHistoryButton = document.getElementById("saveHistory");
const historyEyebrow = document.getElementById("historyEyebrow");
const historyTitle = document.getElementById("historyTitle");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");
const modeButtons = [...document.querySelectorAll("[data-mode]")];
const langButtons = [...document.querySelectorAll("[data-lang]")];
const analysisBlocks = [...document.querySelectorAll(".analysis article")];
const CARD_BACK_SRC = "assets/fate-tarot-card.png";
const SPREAD_GAP = 64;
const COMMONS_CARD_BASE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";
const HISTORY_KEY = "arcanaReadingHistory";

const majorArcana = [
  ["fool", "0", "愚者", "THE FOOL", "△"], ["magician", "I", "魔术师", "THE MAGICIAN", "∞"],
  ["priestess", "II", "女祭司", "THE HIGH PRIESTESS", "☾"], ["empress", "III", "女皇", "THE EMPRESS", "✦"],
  ["emperor", "IV", "皇帝", "THE EMPEROR", "♔"], ["hierophant", "V", "教皇", "THE HIEROPHANT", "✧"],
  ["lovers", "VI", "恋人", "THE LOVERS", "◇"], ["chariot", "VII", "战车", "THE CHARIOT", "↟"],
  ["strength", "VIII", "力量", "STRENGTH", "♌"], ["hermit", "IX", "隐者", "THE HERMIT", "◌"],
  ["wheel", "X", "命运之轮", "WHEEL OF FORTUNE", "◎"], ["justice", "XI", "正义", "JUSTICE", "⚖"],
  ["hanged", "XII", "倒吊人", "THE HANGED MAN", "▽"], ["death", "XIII", "死神", "DEATH", "✧"],
  ["temperance", "XIV", "节制", "TEMPERANCE", "≋"], ["devil", "XV", "恶魔", "THE DEVIL", "♆"],
  ["tower", "XVI", "高塔", "THE TOWER", "▴"], ["star", "XVII", "星星", "THE STAR", "✦"],
  ["moon", "XVIII", "月亮", "THE MOON", "☽"], ["sun", "XIX", "太阳", "THE SUN", "☉"],
  ["judgement", "XX", "审判", "JUDGEMENT", "↥"], ["world", "XXI", "世界", "THE WORLD", "◉"],
];
const suits = [["wands", "权杖", "WANDS", "♆"], ["cups", "圣杯", "CUPS", "☽"], ["swords", "宝剑", "SWORDS", "†"], ["pentacles", "星币", "PENTACLES", "✦"]];
const ranks = [["A", "王牌", "ACE"], ["2", "二", "TWO"], ["3", "三", "THREE"], ["4", "四", "FOUR"], ["5", "五", "FIVE"], ["6", "六", "SIX"], ["7", "七", "SEVEN"], ["8", "八", "EIGHT"], ["9", "九", "NINE"], ["10", "十", "TEN"], ["P", "侍从", "PAGE"], ["N", "骑士", "KNIGHT"], ["Q", "皇后", "QUEEN"], ["K", "国王", "KING"]];
const allCards = [
  ...majorArcana.map(([id, number, zh, en, symbol]) => ({ id, number, zh, en, symbol, arcana: "major" })),
  ...suits.flatMap(([suitId, suitZh, suitEn, symbol]) => ranks.map(([rank, rankZh, rankEn]) => ({
    id: `${suitId}-${rank.toLowerCase()}`,
    number: rank,
    zh: `${suitZh}${rankZh}`,
    en: `${rankEn} OF ${suitEn}`,
    symbol,
    arcana: "minor",
    suitId,
  }))),
];
const majorFaceFiles = {
  fool: "RWS_Tarot_00_Fool.jpg",
  magician: "RWS_Tarot_01_Magician.jpg",
  priestess: "RWS_Tarot_02_High_Priestess.jpg",
  empress: "RWS_Tarot_03_Empress.jpg",
  emperor: "RWS_Tarot_04_Emperor.jpg",
  hierophant: "RWS_Tarot_05_Hierophant.jpg",
  lovers: "RWS_Tarot_06_Lovers.jpg",
  chariot: "RWS_Tarot_07_Chariot.jpg",
  strength: "RWS_Tarot_08_Strength.jpg",
  hermit: "RWS_Tarot_09_Hermit.jpg",
  wheel: "RWS_Tarot_10_Wheel_of_Fortune.jpg",
  justice: "RWS_Tarot_11_Justice.jpg",
  hanged: "RWS_Tarot_12_Hanged_Man.jpg",
  death: "RWS_Tarot_13_Death.jpg",
  temperance: "RWS_Tarot_14_Temperance.jpg",
  devil: "RWS_Tarot_15_Devil.jpg",
  tower: "RWS_Tarot_16_Tower.jpg",
  star: "RWS_Tarot_17_Star.jpg",
  moon: "RWS_Tarot_18_Moon.jpg",
  sun: "RWS_Tarot_19_Sun.jpg",
  judgement: "RWS_Tarot_20_Judgement.jpg",
  world: "RWS_Tarot_21_World.jpg",
};
const minorFacePrefixes = { wands: "Wands", cups: "Cups", swords: "Swords", pentacles: "Pents" };
const rankFaceNumbers = { A: "01", 2: "02", 3: "03", 4: "04", 5: "05", 6: "06", 7: "07", 8: "08", 9: "09", 10: "10", P: "11", N: "12", Q: "13", K: "14" };
const majorJaNames = {
  fool: "愚者", magician: "魔術師", priestess: "女教皇", empress: "女帝", emperor: "皇帝", hierophant: "教皇",
  lovers: "恋人", chariot: "戦車", strength: "力", hermit: "隠者", wheel: "運命の輪", justice: "正義",
  hanged: "吊るされた男", death: "死神", temperance: "節制", devil: "悪魔", tower: "塔", star: "星",
  moon: "月", sun: "太陽", judgement: "審判", world: "世界",
};
const suitJaNames = { wands: "ワンド", cups: "カップ", swords: "ソード", pentacles: "ペンタクル" };
const rankJaNames = { A: "エース", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", P: "ペイジ", N: "ナイト", Q: "クイーン", K: "キング" };
const i18n = {
  zh: {
    htmlLang: "zh-CN",
    nav: ["提问", "抽牌", "解读"],
    heroEyebrow: "ARCANA AI 命运探索",
    heroSubtitle: "Every Question Shapes Your Future",
    heroButton: "Begin Your Reading",
    cinemaLabel: "Beginnings",
    cinemaLine: "Every journey begins with uncertainty.",
    questionEyebrow: "THE QUESTION",
    questionTitle: "What do you seek?",
    questionPlaceholder: "写下一个真正想知道的答案",
    questionEcho: "清晰的问题，会让牌组听见你。",
    submitQuestion: "提交问题",
    deckEyebrow: "THE DECK",
    modeTwelve: "12 张命运之环",
    modeSeventyEight: "78 张完整牌阵",
    gestureStart: "开启手势感应",
    gestureIdle: "先让系统识别你的手，然后用食指选择，张开五指确认。",
    gestureMove: "食指移动能量",
    gestureHover: "靠近牌背聚焦",
    gesturePalm: "张开五指确认",
    holdPalm: "保持五指张开",
    readingEyebrow: "AI READING",
    waiting: "等待抽牌",
    analysisLabels: ["事业", "感情", "学业", "建议"],
    emptyAnalysis: ["请先提出问题，并通过手势从牌组中抽牌。", "牌组会根据你的选择展开对应的命运线索。", "完整牌组模式会抽取三张牌，形成更完整的结构。", "食指选择，张掌确认。不要点击牌面。"],
    deckTitleTwelve: "12 张命运之环",
    deckTitleSeventyEight: "78 张完整牌阵",
    deckStatusTwelve: "食指指向任意一张牌，牌背会放大并发光；张开五指确认。",
    deckStatusSeventyEight: "完整 78 张牌平铺展开。用食指左右滑动牌阵，经过中央预选框的牌会放大并发光；张开五指确认，需要选择 3 张。",
    pointAtCard: "用食指指向一张牌。",
    confirmThisCard: "张开五指，确认这张牌。",
    preselectStatus: (n) => `预选框：第 ${n} / 78 张。张开五指确认。`,
    cameraLoading: "正在识别手...",
    noHand: "正在识别手。请把手放入摄像头范围。",
    mediapipeMissing: "MediaPipe 未能加载，请检查网络。",
    cameraDenied: "摄像头无法启动，请检查浏览器权限。",
    spreadInstruction: "用食指左右滑动牌阵，让牌经过中央预选框。",
    questionRequired: "请先写下一个问题。",
    questionSaved: (q) => `你的问题已进入牌组：${q}`,
    questionIntoTwelve: "问题已进入 12 张命运之环。",
    questionIntoSpread: "问题已进入完整 78 张牌阵。",
    confirmed: (name) => `你确认了：${name}`,
    selectedCount: (n) => `已选择 ${n} / 3 张。继续滑动选择下一张。`,
    selectedDone: "三张牌已经确认。",
    selectedCardTitle: "已确认的牌",
    defaultQuestion: "你的问题",
    career: (q, name) => `围绕“${q}”，${name}提示你先看见正在成形的机会，而不是急于证明结果。`,
    loveOne: "关系中的答案会从真实感受里浮现。",
    loveCard: (name) => `${name}把关系中的隐藏需求带到光下。`,
    studyOne: "完整牌阵会用第三张牌补全成长线索。",
    studyCard: (name) => `${name}代表接下来需要被训练、整合或跨越的能力。`,
    adviceMore: "继续完成抽牌，命运结构会更完整。",
    adviceDone: "三张牌形成了过去、现在与趋势的连续结构。选择一个最小但诚实的行动。",
    aiLoading: "AI 正在读取牌阵，请保持片刻安静。",
    aiKeyMissing: "AI 解读尚未启用：请在 Vercel 环境变量中配置 OPENAI_API_KEY。",
    aiError: "AI 解读暂时没有生成成功。你仍可以根据牌面先阅读这组基础提示。",
    posterEyebrow: "YOUR FATE REPORT",
    posterTitle: "命运海报",
    posterHint: "完成抽牌后生成专属海报，可下载并分享。",
    downloadPoster: "下载海报",
    saveHistory: "保存记录",
    historyEyebrow: "READING HISTORY",
    historyTitle: "历史记录",
    clearHistory: "清空",
    historyEmpty: "还没有历史记录。完成一次抽牌后，它会出现在这里。",
    posterWaiting: "等待抽牌",
    posterQuestion: "问题",
    posterSummary: "AI 总结",
    saved: "已保存",
  },
  en: {
    htmlLang: "en",
    nav: ["Question", "Draw", "Reading"],
    heroEyebrow: "ARCANA AI FATE EXPLORATION",
    heroSubtitle: "Every Question Shapes Your Future",
    heroButton: "Begin Your Reading",
    cinemaLabel: "Beginnings",
    cinemaLine: "Every journey begins with uncertainty.",
    questionEyebrow: "THE QUESTION",
    questionTitle: "What do you seek?",
    questionPlaceholder: "Write the question you truly want answered",
    questionEcho: "A clear question lets the deck hear you.",
    submitQuestion: "Submit question",
    deckEyebrow: "THE DECK",
    modeTwelve: "12-Card Fate Ring",
    modeSeventyEight: "Full 78-Card Deck",
    gestureStart: "Start Gesture Sensing",
    gestureIdle: "Let the system see your hand, then point to choose and open your palm to confirm.",
    gestureMove: "Point to move energy",
    gestureHover: "Approach the card back",
    gesturePalm: "Open palm to confirm",
    holdPalm: "Hold your palm open",
    readingEyebrow: "AI READING",
    waiting: "Waiting for the draw",
    analysisLabels: ["Career", "Love", "Study", "Advice"],
    emptyAnalysis: ["Ask a question first, then draw from the deck with gestures.", "The deck will unfold fate signals from your selection.", "The full deck mode draws three cards for a fuller structure.", "Point to choose, open your palm to confirm. Do not click the cards."],
    deckTitleTwelve: "12-Card Fate Ring",
    deckTitleSeventyEight: "Full 78-Card Deck",
    deckStatusTwelve: "Point at any card. Its back will enlarge and glow; open your palm to confirm.",
    deckStatusSeventyEight: "The full 78-card deck is spread out. Slide the deck with your index finger; the card passing through the center preselection frame will enlarge and glow. Open your palm to confirm. Choose 3 cards.",
    pointAtCard: "Point at a card.",
    confirmThisCard: "Open your palm to confirm this card.",
    preselectStatus: (n) => `Preselection frame: card ${n} / 78. Open your palm to confirm.`,
    cameraLoading: "Detecting your hand...",
    noHand: "Looking for your hand. Place it within the camera view.",
    mediapipeMissing: "MediaPipe could not load. Please check the network.",
    cameraDenied: "Camera could not start. Please check browser permissions.",
    spreadInstruction: "Slide the deck left and right so cards pass through the center frame.",
    questionRequired: "Please write a question first.",
    questionSaved: (q) => `Your question has entered the deck: ${q}`,
    questionIntoTwelve: "Your question has entered the 12-card fate ring.",
    questionIntoSpread: "Your question has entered the full 78-card deck.",
    confirmed: (name) => `You confirmed: ${name}`,
    selectedCount: (n) => `${n} / 3 cards selected. Keep sliding to choose the next one.`,
    selectedDone: "Three cards have been confirmed.",
    selectedCardTitle: "Confirmed card",
    defaultQuestion: "your question",
    career: (q, name) => `Around "${q}", ${name} asks you to notice the opportunity forming before rushing to prove the outcome.`,
    loveOne: "The answer in relationships will rise from honest feeling.",
    loveCard: (name) => `${name} brings hidden relational needs into the light.`,
    studyOne: "The full spread will use a third card to complete the growth line.",
    studyCard: (name) => `${name} points to the ability that must be trained, integrated, or crossed next.`,
    adviceMore: "Complete the draw to reveal a fuller fate structure.",
    adviceDone: "The three cards form a sequence of past, present, and tendency. Choose one small but honest action.",
    aiLoading: "AI is reading the spread. Hold the moment for a breath.",
    aiKeyMissing: "AI reading is not enabled yet: configure OPENAI_API_KEY in Vercel environment variables.",
    aiError: "AI reading could not be generated right now. You can still begin with the basic card guidance.",
    posterEyebrow: "YOUR FATE REPORT",
    posterTitle: "Fate Poster",
    posterHint: "Complete a draw to generate a personal poster you can download and share.",
    downloadPoster: "Download Poster",
    saveHistory: "Save Record",
    historyEyebrow: "READING HISTORY",
    historyTitle: "History",
    clearHistory: "Clear",
    historyEmpty: "No history yet. Finish a reading and it will appear here.",
    posterWaiting: "Waiting for the draw",
    posterQuestion: "Question",
    posterSummary: "AI Summary",
    saved: "Saved",
  },
  ja: {
    htmlLang: "ja",
    nav: ["質問", "ドロー", "リーディング"],
    heroEyebrow: "ARCANA AI 運命探索",
    heroSubtitle: "Every Question Shapes Your Future",
    heroButton: "Begin Your Reading",
    cinemaLabel: "Beginnings",
    cinemaLine: "Every journey begins with uncertainty.",
    questionEyebrow: "THE QUESTION",
    questionTitle: "What do you seek?",
    questionPlaceholder: "本当に知りたい問いを書いてください",
    questionEcho: "明確な問いは、デッキにあなたの声を届けます。",
    submitQuestion: "質問を送信",
    deckEyebrow: "THE DECK",
    modeTwelve: "12枚の運命の輪",
    modeSeventyEight: "78枚フルデッキ",
    gestureStart: "ジェスチャーを開始",
    gestureIdle: "まず手を認識させ、指で選び、手のひらを開いて確定します。",
    gestureMove: "指でエネルギーを動かす",
    gestureHover: "カード裏面に近づく",
    gesturePalm: "手のひらで確定",
    holdPalm: "手のひらを開いたまま",
    readingEyebrow: "AI READING",
    waiting: "カード待機中",
    analysisLabels: ["仕事", "恋愛", "学び", "助言"],
    emptyAnalysis: ["まず問いを入力し、ジェスチャーでデッキからカードを引いてください。", "選ばれたカードから運命の手がかりが展開されます。", "フルデッキでは3枚を引き、より完全な構造を作ります。", "指で選び、手のひらで確定。カードはクリックしません。"],
    deckTitleTwelve: "12枚の運命の輪",
    deckTitleSeventyEight: "78枚フルデッキ",
    deckStatusTwelve: "任意のカードを指すと裏面が拡大して光ります。手のひらを開いて確定します。",
    deckStatusSeventyEight: "78枚のカードが横に広がります。人差し指でデッキを左右に動かし、中央の予選枠を通るカードが拡大して光ります。手のひらを開いて確定し、3枚選びます。",
    pointAtCard: "カードを指してください。",
    confirmThisCard: "手のひらを開いて、このカードを確定します。",
    preselectStatus: (n) => `予選枠：${n} / 78 枚。手のひらを開いて確定。`,
    cameraLoading: "手を認識しています...",
    noHand: "手を探しています。カメラの範囲に入れてください。",
    mediapipeMissing: "MediaPipe を読み込めません。ネットワークを確認してください。",
    cameraDenied: "カメラを開始できません。ブラウザ権限を確認してください。",
    spreadInstruction: "カードが中央の予選枠を通るように、デッキを左右に動かしてください。",
    questionRequired: "先に問いを書いてください。",
    questionSaved: (q) => `問いがデッキに入りました：${q}`,
    questionIntoTwelve: "問いが12枚の運命の輪に入りました。",
    questionIntoSpread: "問いが78枚フルデッキに入りました。",
    confirmed: (name) => `確定しました：${name}`,
    selectedCount: (n) => `${n} / 3 枚を選択済み。次のカードを選んでください。`,
    selectedDone: "3枚のカードが確定しました。",
    selectedCardTitle: "確定したカード",
    defaultQuestion: "あなたの問い",
    career: (q, name) => `「${q}」について、${name}は結果を急ぐ前に、形になりつつある機会を見るよう促しています。`,
    loveOne: "関係性の答えは、正直な感覚の中から浮かび上がります。",
    loveCard: (name) => `${name}は関係の中に隠れた必要を光の下へ運びます。`,
    studyOne: "フルスプレッドでは、3枚目が成長の線を補います。",
    studyCard: (name) => `${name}は次に鍛え、統合し、越えるべき力を示します。`,
    adviceMore: "ドローを完了すると、運命の構造がより明確になります。",
    adviceDone: "3枚は過去、現在、流れの連続を作ります。小さくても誠実な行動を一つ選んでください。",
    aiLoading: "AIがスプレッドを読み取っています。少しだけ静かにお待ちください。",
    aiKeyMissing: "AIリーディングはまだ有効ではありません。Vercel の環境変数に OPENAI_API_KEY を設定してください。",
    aiError: "AIリーディングを生成できませんでした。まずはカードの基本的な示唆を読んでください。",
    posterEyebrow: "YOUR FATE REPORT",
    posterTitle: "運命ポスター",
    posterHint: "ドロー完了後、共有できる専用ポスターを生成します。",
    downloadPoster: "ポスターを保存",
    saveHistory: "記録を保存",
    historyEyebrow: "READING HISTORY",
    historyTitle: "履歴",
    clearHistory: "削除",
    historyEmpty: "履歴はまだありません。リーディング完了後ここに表示されます。",
    posterWaiting: "カード待機中",
    posterQuestion: "問い",
    posterSummary: "AI要約",
    saved: "保存しました",
  },
};

let width = 0;
let height = 0;
let stars = [];
let mode = "twelve";
let currentQuestion = "";
let twelveCards = [];
let pickedCards = [];
let focusedIndex = -1;
let confirmStartedAt = 0;
let spreadIndex = 38.5;
let hands = null;
let camera = null;
let currentLang = "zh";
let readingRequestId = 0;
let lastReadingSignature = "";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const t = (key, ...args) => {
  const value = i18n[currentLang][key];
  return typeof value === "function" ? value(...args) : value;
};

function cardName(card) {
  if (currentLang === "en") return card.en;
  if (currentLang === "ja") {
    if (card.arcana === "major") return majorJaNames[card.id] || card.en;
    return `${suitJaNames[card.suitId]} ${rankJaNames[card.number]}`;
  }
  return card.zh;
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]);
}

function cardArt(card) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 560">
    <defs><radialGradient id="g" cx="50%" cy="42%" r="62%"><stop offset="0%" stop-color="#2b2240"/><stop offset="52%" stop-color="#09090d"/><stop offset="100%" stop-color="#050505"/></radialGradient></defs>
    <rect width="360" height="560" rx="28" fill="url(#g)"/>
    <rect x="22" y="22" width="316" height="516" rx="22" fill="none" stroke="#D8B56A" stroke-opacity=".62" stroke-width="2"/>
    <circle cx="180" cy="250" r="106" fill="none" stroke="#D8B56A" stroke-opacity=".2" stroke-width="2"/>
    <circle cx="180" cy="250" r="62" fill="none" stroke="#D8B56A" stroke-opacity=".34" stroke-width="2"/>
    <text x="180" y="284" text-anchor="middle" font-family="Georgia, serif" font-size="96" fill="#D8B56A">${escapeXml(card.symbol)}</text>
    <text x="42" y="66" font-family="Georgia, serif" font-size="28" fill="#D8B56A">${escapeXml(card.number)}</text>
    <text x="318" y="506" text-anchor="end" font-family="Georgia, serif" font-size="28" fill="#D8B56A">${escapeXml(card.number)}</text>
    <text x="180" y="448" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#F7F2E8" opacity=".9">${escapeXml(cardName(card))}</text>
    <path d="M78 108 C132 86 228 86 282 108" fill="none" stroke="#D8B56A" stroke-opacity=".32"/>
    <path d="M78 392 C132 414 228 414 282 392" fill="none" stroke="#D8B56A" stroke-opacity=".32"/>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.floor(clamp((width * height) / 7600, 120, 260)) }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * .82 + .18,
    r: Math.random() * 1.55 + .2,
    phase: Math.random() * Math.PI * 2,
    gold: index % 8 === 0,
  }));
}

function drawStarfield(time = 0) {
  const scrollDrift = window.scrollY * .055;
  ctx.clearRect(0, 0, width, height);
  stars.forEach((star) => {
    const x = (star.x + Math.sin(time * .00008 + star.phase) * 22 * star.z + width) % width;
    const y = (star.y + time * .006 * star.z + scrollDrift * star.z) % height;
    const twinkle = .42 + Math.sin(time * .00055 + star.phase) * .25;
    ctx.beginPath();
    ctx.arc(x, y, star.r * star.z, 0, Math.PI * 2);
    ctx.fillStyle = star.gold ? `rgba(216,181,106,${.22 + twinkle * .35})` : `rgba(232,236,255,${.14 + twinkle * .2})`;
    ctx.fill();
  });
}

function animate(time) {
  drawStarfield(time);
  requestAnimationFrame(animate);
}

function makeCardElement(card, className) {
  const el = document.createElement("div");
  el.className = `tarot-card-node ${className}`;
  el.dataset.cardId = card.id;
  el.dataset.faceSrc = cardArt(card);
  el.dataset.cardName = cardName(card);
  const img = document.createElement("img");
  img.src = CARD_BACK_SRC;
  img.alt = "Tarot card back";
  el.appendChild(img);
  return el;
}

function renderTwelve() {
  twelveRing.innerHTML = "";
  twelveCards = [...allCards].sort(() => Math.random() - .5).slice(0, 12);
  twelveCards.forEach((card, index) => {
    const el = makeCardElement(card, "twelve-card");
    el.style.setProperty("--angle", `${index * 30}deg`);
    el.style.setProperty("--ry", `${Math.sin(index) * 8}deg`);
    el.style.setProperty("--delay", `${index * -120}ms`);
    twelveRing.appendChild(el);
  });
}

function renderSpread() {
  spreadTrack.innerHTML = "";
  allCards.forEach((card, index) => {
    const el = makeCardElement(card, "spread-card");
    el.style.setProperty("--sx", `${(index - 38.5) * SPREAD_GAP}px`);
    el.style.setProperty("--sy", "0px");
    el.style.setProperty("--sz", `${Math.cos(index * .38) * 10}px`);
    el.style.setProperty("--rz", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--delay", `${index * -35}ms`);
    spreadTrack.appendChild(el);
  });
  updateSpreadFocus();
}

function setMode(nextMode) {
  mode = nextMode;
  deckScene.classList.toggle("mode-twelve", mode === "twelve");
  deckScene.classList.toggle("mode-seventyEight", mode === "seventyEight");
  modeButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));
  pickedCards = [];
  selectionStrip.innerHTML = "";
  focusedIndex = -1;
  confirmStartedAt = 0;
  renderModeText();
  if (mode === "twelve") renderTwelve();
  updateReading();
}

function renderModeText() {
  deckTitle.textContent = mode === "twelve" ? t("deckTitleTwelve") : t("deckTitleSeventyEight");
  deckStatus.textContent = mode === "twelve" ? t("deckStatusTwelve") : t("deckStatusSeventyEight");
}

function updateSpreadFocus() {
  const centeredIndex = Math.round(spreadIndex);
  const centerOffset = (38.5 - centeredIndex) * SPREAD_GAP;
  spreadTrack.style.setProperty("--spread-x", `${centerOffset}px`);
  [...spreadTrack.children].forEach((el, index) => {
    el.classList.toggle("is-focused", index === centeredIndex);
  });
}

function moveOrb(x, y) {
  energyOrb.style.setProperty("--orb-x", `${x * window.innerWidth}px`);
  energyOrb.style.setProperty("--orb-y", `${y * window.innerHeight}px`);
}

function focusTwelveByPoint(x, y) {
  if (pickedCards.length && mode === "twelve") {
    focusedIndex = -1;
    gestureStatus.textContent = t("confirmed", cardName(pickedCards[0]));
    return;
  }
  const px = x * window.innerWidth;
  const py = y * window.innerHeight;
  let nearest = -1;
  let nearestDistance = Infinity;
  [...twelveRing.children].forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const dist = Math.hypot(px - (rect.left + rect.width / 2), py - (rect.top + rect.height / 2));
    if (dist < nearestDistance) {
      nearest = index;
      nearestDistance = dist;
    }
  });
  focusedIndex = nearestDistance < clamp(window.innerWidth * .09, 68, 130) ? nearest : -1;
  [...twelveRing.children].forEach((el, index) => el.classList.toggle("is-focused", index === focusedIndex));
  gestureStatus.textContent = focusedIndex >= 0 ? t("confirmThisCard") : t("pointAtCard");
}

function focusSpreadByPoint(x) {
  spreadIndex = clamp((1 - x) * (allCards.length - 1), 0, allCards.length - 1);
  focusedIndex = Math.round(spreadIndex);
  updateSpreadFocus();
  gestureStatus.textContent = t("preselectStatus", focusedIndex + 1);
}

function classicCardFace(card) {
  const file = card.arcana === "major"
    ? majorFaceFiles[card.id]
    : `${minorFacePrefixes[card.suitId]}${rankFaceNumbers[card.number]}.jpg`;
  return `${COMMONS_CARD_BASE}${encodeURIComponent(file)}?width=520`;
}

function isOpenPalm(landmarks) {
  const wrist = landmarks[0];
  const tips = [8, 12, 16, 20];
  const mcps = [5, 9, 13, 17];
  const extended = tips.filter((tip, i) => distance(landmarks[tip], wrist) > distance(landmarks[mcps[i]], wrist) * 1.26);
  const thumbAway = distance(landmarks[4], landmarks[8]) > .15;
  return extended.length >= 4 && thumbAway;
}

function confirmFocused(openPalm) {
  if (mode === "twelve" && pickedCards.length) {
    confirmStartedAt = 0;
    destinyConfirmation.classList.remove("is-active");
    destinyConfirmation.style.setProperty("--confirm-progress", "0");
    deckStatus.textContent = t("confirmed", cardName(pickedCards[0]));
    return;
  }
  if (!openPalm || focusedIndex < 0) {
    confirmStartedAt = 0;
    destinyConfirmation.classList.remove("is-active");
    destinyConfirmation.style.setProperty("--confirm-progress", "0");
    return;
  }
  destinyConfirmation.classList.add("is-active");
  if (!confirmStartedAt) confirmStartedAt = performance.now();
  const progress = clamp((performance.now() - confirmStartedAt) / 950, 0, 1);
  destinyConfirmation.style.setProperty("--confirm-progress", progress.toFixed(3));
  if (progress < 1) return;

  confirmStartedAt = 0;
  destinyConfirmation.classList.remove("is-active");
  if (mode === "twelve") {
    [...twelveRing.children].forEach((el) => el.classList.remove("is-confirmed"));
    twelveRing.children[focusedIndex]?.classList.add("is-confirmed");
    pickedCards = [twelveCards[focusedIndex]];
    deckStatus.textContent = t("confirmed", cardName(pickedCards[0]));
    updateReading();
    setTimeout(() => document.getElementById("reading").scrollIntoView({ behavior: "smooth" }), 900);
    return;
  }

  const card = allCards[focusedIndex];
  if (!pickedCards.some((item) => item.id === card.id)) pickedCards.push(card);
  spreadTrack.children[focusedIndex]?.classList.add("is-picked");
  renderSelectionStrip();
  deckStatus.textContent = pickedCards.length < 3 ? t("selectedCount", pickedCards.length) : t("selectedDone");
  updateReading();
  if (pickedCards.length >= 3) setTimeout(() => document.getElementById("reading").scrollIntoView({ behavior: "smooth" }), 900);
}

function renderSelectionStrip() {
  selectionStrip.innerHTML = "";
  pickedCards.forEach((card) => {
    const mini = document.createElement("div");
    mini.className = "mini-card";
    mini.dataset.cardId = card.id;
    mini.title = t("selectedCardTitle");
    const img = document.createElement("img");
    img.src = CARD_BACK_SRC;
    img.alt = "Selected tarot card back";
    mini.appendChild(img);
    selectionStrip.appendChild(mini);
  });
}

function isReadingComplete() {
  return mode === "twelve" ? pickedCards.length >= 1 : pickedCards.length >= 3;
}

function readingSignature() {
  return JSON.stringify({
    lang: currentLang,
    mode,
    question: currentQuestion,
    cards: pickedCards.map((card) => card.id),
  });
}

function setReadingLabels() {
  const labels = t("analysisLabels");
  [careerText, loveText, studyText, adviceText].forEach((el, index) => {
    el.previousElementSibling.textContent = labels[index];
  });
}

function setFallbackReading() {
  const q = currentQuestion || t("defaultQuestion");
  careerText.textContent = t("career", q, cardName(pickedCards[0]));
  loveText.textContent = pickedCards[1] ? t("loveCard", cardName(pickedCards[1])) : t("loveOne");
  studyText.textContent = pickedCards[2] ? t("studyCard", cardName(pickedCards[2])) : t("studyOne");
  adviceText.textContent = pickedCards.length >= 3 ? t("adviceDone") : t("adviceMore");
}

function cardPayload(card) {
  return {
    id: card.id,
    name: cardName(card),
    englishName: card.en,
    number: card.number,
    arcana: card.arcana,
    suit: card.suitId || null,
  };
}

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 12)));
}

function currentReadingRecord(source = "manual") {
  if (!pickedCards.length) return null;
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    language: currentLang,
    mode,
    source,
    question: currentQuestion || t("defaultQuestion"),
    cards: pickedCards.map((card) => ({
      id: card.id,
      number: card.number,
      symbol: card.symbol,
      name: cardName(card),
      englishName: card.en,
      arcana: card.arcana,
      suitId: card.suitId || null,
    })),
    reading: {
      career: careerText.textContent,
      love: loveText.textContent,
      study: studyText.textContent,
      advice: adviceText.textContent,
    },
  };
}

function saveCurrentReading(source = "manual") {
  if (!isReadingComplete()) return;
  const record = currentReadingRecord(source);
  if (!record) return;
  const signature = JSON.stringify({
    question: record.question,
    mode: record.mode,
    lang: record.language,
    cards: record.cards.map((card) => card.id),
    advice: record.reading.advice,
  });
  const history = readHistory().filter((item) => item.signature !== signature);
  writeHistory([{ ...record, signature }, ...history]);
  saveHistoryButton.textContent = t("saved");
  setTimeout(() => { saveHistoryButton.textContent = t("saveHistory"); }, 1200);
  renderHistory();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 6) {
  const raw = String(text || "");
  const hasSpaces = /\s/.test(raw);
  const words = hasSpaces ? raw.split(/\s+/) : [...raw];
  const joiner = hasSpaces ? " " : "";
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line}${joiner}${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight));
  return y + Math.min(lines.length, maxLines) * lineHeight;
}

function drawPoster() {
  const w = posterCanvas.width;
  const h = posterCanvas.height;
  const names = pickedCards.length ? pickedCards.map(cardName).join(" / ") : t("posterWaiting");
  const date = new Date().toLocaleDateString(currentLang === "zh" ? "zh-CN" : currentLang === "ja" ? "ja-JP" : "en-US");
  posterCtx.clearRect(0, 0, w, h);
  const bg = posterCtx.createRadialGradient(w * .5, h * .32, 40, w * .5, h * .35, h * .8);
  bg.addColorStop(0, "#2b2240");
  bg.addColorStop(.46, "#07070a");
  bg.addColorStop(1, "#050505");
  posterCtx.fillStyle = bg;
  posterCtx.fillRect(0, 0, w, h);

  posterCtx.strokeStyle = "rgba(216,181,106,.52)";
  posterCtx.lineWidth = 2;
  posterCtx.strokeRect(54, 54, w - 108, h - 108);
  posterCtx.strokeStyle = "rgba(216,181,106,.18)";
  posterCtx.strokeRect(86, 86, w - 172, h - 172);

  posterCtx.textAlign = "center";
  posterCtx.fillStyle = "#d8b56a";
  posterCtx.font = "24px Cinzel, Georgia, serif";
  posterCtx.fillText("ARCANA AI FATE EXPLORATION", w / 2, 138);
  posterCtx.fillStyle = "#f7f2e8";
  posterCtx.font = "86px Cinzel, Georgia, serif";
  drawWrappedText(posterCtx, names, w / 2, 250, 860, 88, 3);

  posterCtx.fillStyle = "rgba(216,181,106,.2)";
  posterCtx.beginPath();
  posterCtx.arc(w / 2, 520, 150, 0, Math.PI * 2);
  posterCtx.strokeStyle = "rgba(216,181,106,.34)";
  posterCtx.stroke();
  posterCtx.fillStyle = "#d8b56a";
  posterCtx.font = "120px Cinzel, Georgia, serif";
  posterCtx.fillText(pickedCards[0]?.symbol || "✦", w / 2, 560);

  posterCtx.textAlign = "left";
  posterCtx.fillStyle = "rgba(216,181,106,.82)";
  posterCtx.font = "26px Inter, Arial, sans-serif";
  posterCtx.fillText(date, 120, 760);
  posterCtx.fillText(t("posterQuestion"), 120, 845);
  posterCtx.fillStyle = "rgba(247,242,232,.82)";
  posterCtx.font = "34px Inter, Arial, sans-serif";
  drawWrappedText(posterCtx, currentQuestion || t("defaultQuestion"), 120, 895, 840, 48, 3);

  posterCtx.fillStyle = "rgba(216,181,106,.82)";
  posterCtx.font = "26px Inter, Arial, sans-serif";
  posterCtx.fillText(t("posterSummary"), 120, 1080);
  posterCtx.fillStyle = "rgba(247,242,232,.78)";
  posterCtx.font = "32px Inter, Arial, sans-serif";
  drawWrappedText(posterCtx, adviceText.textContent || t("posterHint"), 120, 1132, 840, 46, 5);

  posterCtx.textAlign = "center";
  posterCtx.fillStyle = "rgba(216,181,106,.72)";
  posterCtx.font = "22px Cinzel, Georgia, serif";
  posterCtx.fillText("YOUR FATE REPORT", w / 2, h - 108);
}

function downloadPosterImage() {
  drawPoster();
  const link = document.createElement("a");
  link.download = `arcana-fate-report-${Date.now()}.png`;
  link.href = posterCanvas.toDataURL("image/png");
  link.click();
}

function renderHistory() {
  const history = readHistory();
  if (!history.length) {
    historyList.innerHTML = `<p class="history-empty">${t("historyEmpty")}</p>`;
    return;
  }
  historyList.innerHTML = history.map((item) => {
    const cards = item.cards.map((card) => escapeXml(card.name)).join(" / ");
    const date = new Date(item.createdAt).toLocaleString(currentLang === "zh" ? "zh-CN" : currentLang === "ja" ? "ja-JP" : "en-US", { dateStyle: "medium", timeStyle: "short" });
    return `<button class="history-item" type="button" data-history-id="${item.id}">
      <span><strong>${cards}</strong>${escapeXml(item.question)}</span>
      <em>${date}</em>
    </button>`;
  }).join("");
}

function loadHistoryRecord(id) {
  const record = readHistory().find((item) => item.id === id);
  if (!record) return;
  mode = record.mode === "seventyEight" ? "seventyEight" : "twelve";
  setMode(mode);
  currentQuestion = record.question;
  questionInput.value = record.question;
  questionEcho.textContent = t("questionSaved", currentQuestion);
  pickedCards = record.cards.map((card) => allCards.find((item) => item.id === card.id) || {
    id: card.id,
    number: card.number,
    symbol: card.symbol,
    zh: card.name,
    en: card.englishName,
    arcana: card.arcana,
    suitId: card.suitId,
  });
  renderSelectionStrip();
  [...spreadTrack.children].forEach((el) => el.classList.remove("is-picked"));
  pickedCards.forEach((card) => {
    const index = allCards.findIndex((item) => item.id === card.id);
    if (index >= 0) spreadTrack.children[index]?.classList.add("is-picked");
  });
  readingTitle.textContent = record.cards.map((card) => card.name).join(" / ");
  readingKeywords.innerHTML = record.cards.map((card) => `<span>${escapeXml(card.symbol)} ${escapeXml(card.number)}</span>`).join("");
  readingCards.innerHTML = record.cards.map((card) => `
    <figure class="reading-card-face">
      <img src="${classicCardFace(card)}" alt="${escapeXml(card.englishName)} tarot card" loading="lazy" />
    </figure>
  `).join("");
  setReadingLabels();
  careerText.textContent = record.reading.career;
  loveText.textContent = record.reading.love;
  studyText.textContent = record.reading.study;
  adviceText.textContent = record.reading.advice;
  drawPoster();
  document.getElementById("reading").scrollIntoView({ behavior: "smooth" });
}

async function requestAiReading(signature) {
  const requestId = ++readingRequestId;
  [careerText, loveText, studyText, adviceText].forEach((el) => {
    el.textContent = t("aiLoading");
    el.classList.add("is-loading");
  });

  try {
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: currentQuestion,
        language: currentLang,
        mode,
        cards: pickedCards.map(cardPayload),
      }),
    });
    const data = await response.json();
    if (requestId !== readingRequestId || signature !== lastReadingSignature) return;

    if (!response.ok) {
      [careerText, loveText, studyText, adviceText].forEach((el) => el.classList.remove("is-loading"));
      setFallbackReading();
      adviceText.textContent = response.status === 503 ? t("aiKeyMissing") : `${t("aiError")} ${data.error || ""}`.trim();
      drawPoster();
      saveCurrentReading("fallback");
      return;
    }

    [careerText, loveText, studyText, adviceText].forEach((el) => el.classList.remove("is-loading"));
    if (Array.isArray(data.keywords) && data.keywords.length) {
      readingKeywords.innerHTML = data.keywords.slice(0, 3).map((item) => `<span>${escapeXml(item)}</span>`).join("");
    }
    careerText.textContent = data.career || careerText.textContent;
    loveText.textContent = data.love || loveText.textContent;
    studyText.textContent = data.study || studyText.textContent;
    adviceText.textContent = data.advice || data.summary || adviceText.textContent;
    drawPoster();
    saveCurrentReading("ai");
  } catch (error) {
    if (requestId !== readingRequestId || signature !== lastReadingSignature) return;
    [careerText, loveText, studyText, adviceText].forEach((el) => el.classList.remove("is-loading"));
    setFallbackReading();
    adviceText.textContent = t("aiError");
    drawPoster();
    saveCurrentReading("fallback");
  }
}

function updateReading() {
  if (!pickedCards.length) {
    readingCards.innerHTML = "";
    readingTitle.textContent = t("waiting");
    readingKeywords.innerHTML = "<span>Question</span><span>Deck</span><span>Fate</span>";
    setReadingLabels();
    const empty = t("emptyAnalysis");
    [careerText, loveText, studyText, adviceText].forEach((el, index) => {
      el.classList.remove("is-loading");
      el.textContent = empty[index];
    });
    lastReadingSignature = "";
    drawPoster();
    return;
  }
  const names = pickedCards.map(cardName).join(" / ");
  readingCards.innerHTML = pickedCards.map((card) => `
    <figure class="reading-card-face">
      <img src="${classicCardFace(card)}" alt="${escapeXml(card.en)} tarot card" loading="lazy" />
    </figure>
  `).join("");
  readingTitle.textContent = names;
  readingKeywords.innerHTML = pickedCards.map((card) => `<span>${card.symbol} ${card.number}</span>`).join("");
  setReadingLabels();
  [careerText, loveText, studyText, adviceText].forEach((el) => el.classList.remove("is-loading"));
  setFallbackReading();

  if (!isReadingComplete()) {
    lastReadingSignature = "";
    drawPoster();
    return;
  }

  const signature = readingSignature();
  if (signature === lastReadingSignature) return;
  lastReadingSignature = signature;
  requestAiReading(signature);
}

function handleHandResults(results) {
  if (!results.multiHandLandmarks?.length) {
    gestureStatus.textContent = t("noHand");
    return;
  }
  const hand = results.multiHandLandmarks[0];
  const indexTip = hand[8];
  const x = 1 - indexTip.x;
  const y = indexTip.y;
  moveOrb(x, y);
  if (mode === "twelve") focusTwelveByPoint(x, y);
  else focusSpreadByPoint(x);
  confirmFocused(isOpenPalm(hand));
}

async function startGesture() {
  if (!window.Hands || !window.Camera) {
    gestureStatus.textContent = t("mediapipeMissing");
    return;
  }
  try {
    deckScene.classList.add("is-gesture-active");
    gestureStart.style.display = "none";
    gestureStatus.textContent = t("cameraLoading");
    hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: .68, minTrackingConfidence: .68 });
    hands.onResults(handleHandResults);
    camera = new Camera(gestureVideo, { onFrame: async () => hands.send({ image: gestureVideo }), width: 640, height: 400 });
    await camera.start();
    gestureStatus.textContent = mode === "twelve" ? t("pointAtCard") : t("spreadInstruction");
  } catch {
    deckScene.classList.remove("is-gesture-active");
    gestureStart.style.display = "";
    gestureStatus.textContent = t("cameraDenied");
  }
}

function saveQuestion(event) {
  event.preventDefault();
  currentQuestion = questionInput.value.trim();
  if (!currentQuestion) {
    questionEcho.textContent = t("questionRequired");
    return;
  }
  questionEcho.textContent = t("questionSaved", currentQuestion);
  deckStatus.textContent = mode === "twelve" ? t("questionIntoTwelve") : t("questionIntoSpread");
  document.getElementById("deck").scrollIntoView({ behavior: "smooth" });
}

function observeAnalysis() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: .35 });
  analysisBlocks.forEach((block) => observer.observe(block));
}

function applyLanguage(nextLang) {
  currentLang = nextLang;
  document.documentElement.lang = t("htmlLang");
  langButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.lang === currentLang));

  document.querySelectorAll(".site-header nav a").forEach((link, index) => { link.textContent = t("nav")[index]; });
  document.querySelector(".hero .eyebrow").textContent = t("heroEyebrow");
  document.querySelector(".hero .subtitle").textContent = t("heroSubtitle");
  document.querySelector(".hero .gold-button").textContent = t("heroButton");
  document.querySelector(".cinema-card-face em").textContent = t("cinemaLabel");
  cinemaLine.textContent = t("cinemaLine");
  document.querySelector(".question .eyebrow").textContent = t("questionEyebrow");
  document.querySelector(".question h2").textContent = t("questionTitle");
  questionInput.placeholder = t("questionPlaceholder");
  document.querySelector(".line-submit").setAttribute("aria-label", t("submitQuestion"));
  questionEcho.textContent = currentQuestion ? t("questionSaved", currentQuestion) : t("questionEcho");
  document.querySelector(".deck-copy .eyebrow").textContent = t("deckEyebrow");
  modeButtons[0].textContent = t("modeTwelve");
  modeButtons[1].textContent = t("modeSeventyEight");
  posterEyebrow.textContent = t("posterEyebrow");
  posterTitle.textContent = t("posterTitle");
  posterHint.textContent = t("posterHint");
  downloadPoster.textContent = t("downloadPoster");
  saveHistoryButton.textContent = t("saveHistory");
  historyEyebrow.textContent = t("historyEyebrow");
  historyTitle.textContent = t("historyTitle");
  clearHistory.textContent = t("clearHistory");
  gestureStart.textContent = t("gestureStart");
  if (gestureStart.style.display !== "none") gestureStatus.textContent = t("gestureIdle");
  const gestureTexts = [t("gestureMove"), t("gestureHover"), t("gesturePalm")];
  document.querySelectorAll(".gesture-step p").forEach((item, index) => { item.textContent = gestureTexts[index]; });
  document.getElementById("destinyLabel").textContent = t("holdPalm");
  document.querySelector(".reading .eyebrow").textContent = t("readingEyebrow");

  renderModeText();
  if (pickedCards.length) {
    deckStatus.textContent = mode === "twelve"
      ? t("confirmed", cardName(pickedCards[0]))
      : (pickedCards.length < 3 ? t("selectedCount", pickedCards.length) : t("selectedDone"));
  }
  renderSelectionStrip();
  updateReading();
  renderHistory();
  drawPoster();
}

function updateScrollExperience() {
  const y = window.scrollY;
  document.documentElement.style.setProperty("--star-parallax", `${Math.min(y * .08, 160)}`);

  if (heroCard) {
    heroCard.style.setProperty("--hero-rz", `${-2 + Math.sin(y * .003) * 2.2}deg`);
    heroCard.style.setProperty("--hero-scroll-ry", `${Math.sin(y * .002) * 7}deg`);
    heroCard.style.setProperty("--hero-scroll-rx", `${Math.cos(y * .002) * -4}deg`);
  }

  const cinema = document.getElementById("cinema");
  if (!cinema || !cinemaCard) return;
  const rect = cinema.getBoundingClientRect();
  const total = cinema.offsetHeight - window.innerHeight;
  const progress = clamp(-rect.top / total, 0, 1);
  const rotate = progress < .62 ? progress * 72 : 72 + (progress - .62) / .38 * 120;
  const scale = 1 + progress * 1.18;
  const copyOpacity = clamp((progress - .48) / .22, 0, 1);
  const lineOpacity = clamp((progress - .68) / .18, 0, 1);

  cinemaCard.style.setProperty("--cinema-ry", `${rotate}deg`);
  cinemaCard.style.setProperty("--cinema-rz", `${progress * 7 - 2}deg`);
  cinemaCard.style.setProperty("--cinema-scale", scale.toFixed(3));
  cinemaTitle.style.opacity = copyOpacity.toFixed(3);
  cinemaLine.style.opacity = lineOpacity.toFixed(3);
  document.documentElement.style.setProperty("--cinema-copy-opacity", copyOpacity.toFixed(3));
  document.documentElement.style.setProperty("--cinema-copy-y", `${(1 - copyOpacity) * 44}px`);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  updateScrollExperience();
});
window.addEventListener("scroll", updateScrollExperience, { passive: true });
window.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth - .5;
  const y = event.clientY / window.innerHeight - .5;
  const hero = document.getElementById("hero");
  const heroRect = hero?.getBoundingClientRect();
  const inHero = heroRect && event.clientY >= heroRect.top && event.clientY <= heroRect.bottom;

  if (inHero) {
    const localX = ((event.clientX - heroRect.left) / heroRect.width) * 100;
    const localY = ((event.clientY - heroRect.top) / heroRect.height) * 100;
    document.documentElement.style.setProperty("--pointer-x", `${localX.toFixed(2)}%`);
    document.documentElement.style.setProperty("--pointer-y", `${localY.toFixed(2)}%`);
    document.documentElement.style.setProperty("--hero-pointer-opacity", ".72");
    heroCard?.style.setProperty("--hero-mouse-ry", `${x * 18}deg`);
    heroCard?.style.setProperty("--hero-mouse-rx", `${y * -14}deg`);
    heroCard?.style.setProperty("--hero-card-x", `${x * 18}px`);
    heroCard?.style.setProperty("--hero-card-y", `${y * 10}px`);
    document.querySelector(".hero-copy")?.style.setProperty("--hero-copy-x", `${x * -12}px`);
    document.querySelector(".hero-copy")?.style.setProperty("--hero-copy-y", `${y * -8}px`);
  }

  document.querySelectorAll(".gold-button").forEach((button) => {
    const rect = button.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distanceFromButton = Math.hypot(dx, dy);
    const force = clamp(1 - distanceFromButton / 220, 0, 1);
    button.style.setProperty("--button-nudge-x", `${dx * .045 * force}px`);
    button.style.setProperty("--button-nudge-y", `${dy * .035 * force}px`);
  });
});

document.getElementById("hero")?.addEventListener("mouseleave", () => {
  document.documentElement.style.setProperty("--hero-pointer-opacity", ".18");
  heroCard?.style.setProperty("--hero-mouse-ry", "0deg");
  heroCard?.style.setProperty("--hero-mouse-rx", "0deg");
  heroCard?.style.setProperty("--hero-card-x", "0px");
  heroCard?.style.setProperty("--hero-card-y", "0px");
  document.querySelector(".hero-copy")?.style.setProperty("--hero-copy-x", "0px");
  document.querySelector(".hero-copy")?.style.setProperty("--hero-copy-y", "0px");
});
questionForm.addEventListener("submit", saveQuestion);
gestureStart.addEventListener("click", startGesture);
downloadPoster.addEventListener("click", downloadPosterImage);
saveHistoryButton.addEventListener("click", () => saveCurrentReading("manual"));
clearHistory.addEventListener("click", () => {
  writeHistory([]);
  renderHistory();
});
historyList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-history-id]");
  if (item) loadHistoryRecord(item.dataset.historyId);
});
modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
langButtons.forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));

resizeCanvas();
renderTwelve();
renderSpread();
setMode("twelve");
observeAnalysis();
applyLanguage("zh");
renderHistory();
drawPoster();
updateScrollExperience();
requestAnimationFrame(animate);
