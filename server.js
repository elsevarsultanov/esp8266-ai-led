const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// =====================================================
// COMMAND QUEUE
// =====================================================

let pendingCommand = null;

// YALNIZ BU KOMANDALAR İCAZƏLİDİR
const validCommands = [
  "inside_on",
  "inside_off",

  "yellow_on",
  "yellow_off",

  "blue_on",
  "blue_off",

  "red_on",
  "red_off",

  "white_on",
  "white_off",

  "green_on",
  "green_off",

  "all_on",
  "all_off",

  "clothes_open",
  "clothes_close"
];

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.send("ESP8266 Smart Home Server is running!");
});

// =====================================================
// ESP8266 COMMAND POLLING
// ESP8266 ONLY READS COMMANDS FROM HERE
// =====================================================

app.get("/command", (req, res) => {

  console.log("ESP8266 POLL");

  if (pendingCommand) {

    const commandToSend = pendingCommand;

    console.log("SENDING COMMAND TO ESP8266:", commandToSend);

    // Komandanı yalnız bir dəfə göndər
    pendingCommand = null;

    res.type("text/plain").send(commandToSend);

    return;
  }

  console.log("NO COMMAND");

  res.type("text/plain").send("none");
});

// =====================================================
// MANUAL COMMAND
// =====================================================

app.get("/api/led/:action", (req, res) => {

  const action = req.params.action;

  console.log("MANUAL COMMAND:", action);

  if (!validCommands.includes(action)) {

    console.log("INVALID COMMAND:", action);

    return res.status(400).json({
      success: false,
      error: "Invalid command",
      command: action
    });
  }

  pendingCommand = action;

  console.log("COMMAND QUEUED:", pendingCommand);

  res.json({
    success: true,
    command: action,
    message: "Command queued for ESP8266"
  });
});

// =====================================================
// SIMPLE MANUAL TEST ENDPOINTS
// =====================================================

app.get("/yellow/on", (req, res) => {
  pendingCommand = "yellow_on";

  console.log("MANUAL: yellow_on");

  res.json({
    success: true,
    command: "yellow_on"
  });
});

app.get("/yellow/off", (req, res) => {
  pendingCommand = "yellow_off";

  console.log("MANUAL: yellow_off");

  res.json({
    success: true,
    command: "yellow_off"
  });
});

// =====================================================
// STATUS
// =====================================================

app.get("/api/status", (req, res) => {

  res.json({
    server: "online",
    pendingCommand: pendingCommand,
    allowedCommands: validCommands
  });

});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {

  console.log("=================================");
  console.log("ESP8266 SMART HOME SERVER");
  console.log("=================================");
  console.log("PORT:", PORT);
  console.log("SERVER READY");
  console.log("=================================");

});
