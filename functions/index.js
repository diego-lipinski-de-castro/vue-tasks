const functions = require('firebase-functions');
const express = require('express');
const app = express();
const port = 3000;

const admin = require('firebase-admin');
const serviceAccount1 = require('./vue-kanban-6da52-firebase-adminsdk-1zmxa-5d6b414a1a.json');
const serviceAccount2 = require('./vue-kanban-2-firebase-adminsdk-z4oz7-d1e1740e59.json');

const app1 = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount1),
    databaseURL: 'https://vue-kanban-6da52.firebaseio.com'
}, 'app1');

const app2 = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount2),
    databaseURL: 'https://vue-kanban-2.firebaseio.com'
}, 'app2');

app.listen(port, function () {
    console.log('listening on ' + port);
});

app.get('/hi', (req, res) => {
    res.send('hi');
});

app.get('/replicate', (req, res) => {
    res.send('replicated');
});

// exports.app = functions.https.onRequest(app);

// exports.replicate = functions.firestore.document('tasks/{taskId}').onWrite((change, context) => {
//     console.log('change', change)
//     console.log('context', context)
// })

// exports.replicate = functions.database.ref().onWrite((change, context) => {
//     console.log(change, context)
// });