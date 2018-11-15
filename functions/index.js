const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send(`<div style="background-color: #ffa100; color:#fff">Hello From Opsgenie ${request.body.text}</div>`);
});
