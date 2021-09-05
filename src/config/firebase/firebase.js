// import app from "firebase/app"
// import "firebase/auth"
// import 'firebase/firestore'


// const configFirebase = {
//     apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
//     authDomain: process.env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
//     projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"],
//     storageBucket: process.env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
// }

// class Firebase {
//     constructor() {
//         app.initializeApp(configFirebase)

//         this.auth = app.auth()
//         this.firestore = app.firestore()
//     }

//     createFirebaseUser = obj => this.auth.createUserWithEmailAndPassword(obj.email, obj.password)

//     loginFirebaseUser = obj => this.auth.signInWithEmailAndPassword(obj.email, obj.password)

//     currentLoggedFirebaseUser = obj => this.auth.onAuthStateChanged(obj)

//     logoutFirebaseUser = () => this.auth.signOut()

//     crudFirestore = () => this.firestore.collection("customers")
// }

// export default Firebase