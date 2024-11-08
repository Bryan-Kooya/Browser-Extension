const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('attachments_bucket-1');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),  // GCP default credentials
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
