const { onRequest } = require("firebase-functions/v2/https");

const app = require("./config/app");

exports.api = onRequest(app.callback());
