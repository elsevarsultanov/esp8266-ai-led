const express = require("express");

const app = express();

app.use(express.json());

let command = "LED_OFF";

app.get("/", (req, res) => {
  res.send("ESP8266 AI LED Server is running!");
});

// ESP8266 əmri buradan oxuyacaq
app.get("/command", (req, res) => {
  res.send(command);
});

// LED ON
app.get("/led/on", (req, res) => {
  command = "LED_ON";

  res.json({
    success: true,
    command: "LED_ON"
  });
});

// LED OFF
app.get("/led/off", (req, res) => {
  command = "LED_OFF";

  res.json({
    success: true,
    command: "LED_OFF"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
