const functions = require('firebase-functions');
const express = require('express');
const app = express();
const port = 3000;

const admin = require('firebase-admin');
const serviceAccount = require('./vue-kanban-6da52-firebase-adminsdk-1zmxa-5d6b414a1a.json');

const fireApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vue-kanban-6da52.firebaseio.com'
}, 'app');

app.listen(port, () => {
    console.log('listening on ' + port);
});

app.get('/hi', (req, res) => {
    res.send('hi');
    
    fireApp.database().ref('ips').push({ ip: req.headers['x-forwarded-for'] });
});

exports.app = functions.https.onRequest(app);

exports.incrementTaskCount = functions.firestore.document('tasks/{taskId}').onCreate(async (snapshot, context) => {

    const tabRef = snapshot.ref.parent.parent.collection('tabs').doc(snapshot.data().tab)   

    fireApp.firestore().runTransaction(async t => {
        return t.get(tabRef)
            .then(doc => {
                let newTaskCount = doc.data().taskCount + 1
                t.update(tabRef, { taskCount: newTaskCount })

                return Promise.resolve('Tasks increased to ' + newTaskCount);
            })
    })

    return null;
});

exports.decrementTaskCount = functions.firestore.document('tasks/{taskId}').onDelete(async (snapshot, context) => {

    const tabRef = snapshot.ref.parent.parent.collection('tabs').doc(snapshot.data().tab)   

    fireApp.firestore().runTransaction(async t => {
        return t.get(tabRef)
            .then(doc => {
                let newTaskCount = doc.data().taskCount -1
                t.update(tabRef, { taskCount: newTaskCount })

                return Promise.resolve('Tasks decreased to ' + newTaskCount);
            })
    })

    return null;
});