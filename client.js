const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const config = require("./config");

// Create Basic Authentication header
const authHeader = Buffer.from(
  `${config.auth.username}:${config.auth.password}`
).toString("base64");

// Create WebSocket connection with authentication header
const ws = new WebSocket(
  `ws://${config.websocket.url}:33033/ocpp/${config.auth.clientId}`,
  config.websocket.protocols,
  {
    headers: {
      Authorization: `Basic ${authHeader}`,
    },
  }
);

ws.on("open", () => {
  console.log("Connected to Central System");
  console.log(`Client ID: ${config.auth.clientId}`);
  console.log(`Username: ${config.auth.username}`);

  const bootNotificationMsg = [
    2, // MessageTypeId: CALL
    uuidv4(),
    "BootNotification",
    {
      chargePointModel: config.chargePoint.model,
      chargePointVendor: config.chargePoint.vendor,
    },
  ];

  sendMessage(bootNotificationMsg);

  setInterval(() => {
    const heartbeatMsg = [2, uuidv4(), "Heartbeat", {}];
    sendMessage(heartbeatMsg);
  }, 30000);
});

ws.on("message", (data) => {
  console.log("Received:", data);
  try {
    const message = JSON.parse(data);
    console.log("Parsed message:", message);

    if (Array.isArray(message) && message[1] === "Heartbeat") {
      const callId = message[0];
      const response = [
        3, // MessageTypeId: CALLRESULT
        callId,
        {
          currentTime: new Date().toISOString(),
        },
      ];
      sendMessage(response);
    }
  } catch (e) {
    console.error("Failed to parse message:", e);
  }
});

ws.on("close", () => {
  console.log("Connection closed");
});

ws.on("error", (err) => {
  console.error("Connection error:", err);
});

function sendMessage(msg) {
  const raw = JSON.stringify(msg);
  console.log("Sending:", raw);
  ws.send(raw);
}
