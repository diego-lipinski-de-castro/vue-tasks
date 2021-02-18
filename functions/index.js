const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./vue-tasks-90137-firebase-adminsdk-onpnj-18d48db625.json');

const fireApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

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
                let newTaskCount = doc.data().taskCount - 1
                t.update(tabRef, { taskCount: newTaskCount })

                return Promise.resolve('Tasks decreased to ' + newTaskCount);
            })
    })

    return null;
});