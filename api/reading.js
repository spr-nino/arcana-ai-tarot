module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "OPENAI_API_KEY is not configured" });
  }

  try {
    const { question, language, mode, cards } = req.body || {};
    if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({ error: "No cards were provided" });
    }

    const languageName = language === "ja" ? "Japanese" : language === "en" ? "English" : "Simplified Chinese";
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.82,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: [
              "You are ARCANA, a premium AI tarot reading guide.",
              "Write elegant, grounded, reflective tarot interpretations.",
              "Do not claim certainty about the future.",
              "Avoid medical, legal, or financial advice.",
              "Return only valid JSON with keys: keywords, career, love, study, advice, summary.",
              "keywords must be an array of exactly three short phrases.",
            ].join(" "),
          },
          {
            role: "user",
            content: JSON.stringify({
              language: languageName,
              question: question || "No explicit question was provided.",
              drawingMode: mode,
              cards,
              instruction: "Generate the reading in the requested language. Keep each section concise, cinematic, and useful.",
            }),
          },
        ],
      }),
    });

    const payload = await completion.json();
    if (!completion.ok) {
      return res.status(completion.status).json({ error: payload.error?.message || "OpenAI request failed" });
    }

    const content = payload.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Reading generation failed" });
  }
};
