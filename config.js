require("dotenv").config({ path: ".env.local" });

// OCPP Authentication Configuration
module.exports = {
  auth: {
    username: process.env.OCPP_USERNAME || "your_username",
    password: process.env.OCPP_PASSWORD || "your_password",
    clientId: process.env.OCPP_CLIENT_ID || "your_charge_point_id",
  },

  websocket: {
    url: process.env.EMQX_CLOUD_DEPLOYMENT_ADDRESS || "your_emqx_cloud_deployment_address",
    protocols: ["ocpp1.6"],
  },

  chargePoint: {
    model: "NodeSim-ModelX",
    vendor: "NodeSim Inc.",
  },
};
