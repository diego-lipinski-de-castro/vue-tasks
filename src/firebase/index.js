import config from './config.json'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/performance'

const app = firebase.initializeApp(config)

const auth = app.auth()
const firestore = app.firestore()
const performance = firebase.performance();

export {
    auth, firestore, performance
}