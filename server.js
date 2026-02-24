const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function askAI(message) {

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
          "You are a human-like voice assistant. Default language Hindi. If user speaks Marathi, reply Marathi. Talk naturally like real human."
        },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Call answer
app.post("/answer", async (req, res) => {

  const userSpeech = req.body.speech || "Hello";

  const aiReply = await askAI(userSpeech);

  res.json({
    action: "talk",
    text: aiReply
  });
});

// Hangup
app.post("/hangup", (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => console.log("AI Server running"));
