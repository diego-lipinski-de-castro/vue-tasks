import config from './config.json'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/performance'

const app = firebase.initializeApp(config)

const auth = app.auth()
const firestore = app.firestore()
const database = app.database()
const performance = firebase.performance();

export {
    auth, firestore, database, performance
}