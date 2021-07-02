// 1. Import dependencies
const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const { request } = require("websocket");

// 2. Create Instance of Assistant
console.log("in watson ");
// 2.1 First authenticate
const authenticator = new IamAuthenticator({
  apikey: process.env.WATSON_ASSISTANT_APIKEY,
});
console.log("in watson auth");
// 2.2 Connect to assistant
const assistant = new AssistantV2({
  version: "2019-02-28",
  authenticator: authenticator,
  url: process.env.WATSON_ASSISTANT_URL,
});
console.log("in watson conn");
// 3. Route to Handle Session Tokens
// GET /api/watson/session
router.get("/session", async (req, res) => {
  console.log("here in session");
   // If successs
  try {
    const session = await assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID
    });
    res.json(session["result"])
    // If fail
  } catch (err) {
    res.send("There was an error processing your request.");
    console.log(err);
  }
});

// 4. Handle Messages
// POST /api/watson/message
router.post("/message", async (req, res) => {
  // Construct payload
  const { input, sessionId } = req.body;
  console.log ("body session id "+sessionId);
   // Construct Payload
   const payload = {
       assistantId: process.env.WATSON_ASSISTANT_ID,
       sessionId,
       input
   }

  // If successs
  try {
    const message = await assistant.message(payload);
    
    res.json(message["result"]);

    // If fail
  } catch (err) {
    res.send("There was an error processing your request."+payload);
    console.log(err);
  }
});

// 5. Export routes
module.exports = router;