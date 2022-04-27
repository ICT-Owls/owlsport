const admin = require("firebase-admin");
const serviceAccount = require("../***REMOVED***-firebase-adminsdk-wf7mw-0e8fb32b51.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "***REMOVED***",
});

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

async function decodeIDToken(req, res, next) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    try {
      const idToken = req.headers.authorization.split("Bearer ")[1];

      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req["user"] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

app.use(decodeIDToken);

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("build", "index.html"));
});

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});
