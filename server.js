const express = require("express");
const app = express();

app.use(express.json());

// Answer URL (Call start)
app.post("/answer", (req, res) => {
  res.json({
    action: "talk",
    text: "Hello! Welcome to Neon AI Caller."
  });
});

// Hangup URL
app.post("/hangup", (req, res) => {
  console.log("Call ended");
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running...");
});
