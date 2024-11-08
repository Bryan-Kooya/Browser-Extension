// backend/firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./keys/message-scanner-extension-firebase-adminsdk-xlxb1-f9bd8c4dfe.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
module.exports = { auth };
