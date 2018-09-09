import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCvryCI0NBROS-cQ9pX6WCyNGEsxJcMCSY",
    authDomain: "creditoffset-25fed.firebaseapp.com",
    databaseURL: "https://creditoffset-25fed.firebaseio.com",
    projectId: "creditoffset-25fed",
    storageBucket: "creditoffset-25fed.appspot.com",
    messagingSenderId: "232177904298"
}

let firebaseApp = firebase.initializeApp(config)

let db = firebaseApp.firestore()

db.settings({ timestampsInSnapshots: true });

db.enablePersistence()
    .catch(function(err) {
        if (err.code === 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
        } else if (err.code === 'unimplemented') {
            console.log('The current browser does not support all of the features required to enable persistence.')
        }
    });

export default db