import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDcXo1rHp_L3b9p36Ib64lG01GXiz7eOAg",
    authDomain: "nextfire-app-ec07d.firebaseapp.com",
    projectId: "nextfire-app-ec07d",
    storageBucket: "nextfire-app-ec07d.appspot.com",
    messagingSenderId: "728294049227",
    appId: "1:728294049227:web:8ce95889b4814bd6bd224e",
    measurementId: "G-GE8TZDCCVX"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();