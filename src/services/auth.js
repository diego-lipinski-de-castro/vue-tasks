import firebase from 'firebase/app'
import { auth } from './../firebase'

const login = async () => {
    try {
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        const { user } = await auth.signInWithPopup(googleProvider)

        return {
            success: true,
            data: user
        }
    } catch (error) {
        console.log('error', error)
        return {
            success: false,
            data: null
        }
    }
}

const logout = async () => {
    await auth.signOut()
}

export {
    login,
    logout
}