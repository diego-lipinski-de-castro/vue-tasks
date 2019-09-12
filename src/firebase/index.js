import config from './config.json'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp(config)

const auth = app.auth()
const firestore = app.firestore()

export {
    auth, firestore
}