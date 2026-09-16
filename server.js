const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ESP8266 AI LED Server is running!");
});

app.post("/led/on", (req, res) => {
  console.log("LED ON command received");
  res.json({
    success: true,
    command: "LED_ON"
  });
});

app.post("/led/off", (req, res) => {
  console.log("LED OFF command received");
  res.json({
    success: true,
    command: "LED_OFF"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
