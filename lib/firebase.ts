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
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export async function getUSerWithUsername(username: string) {
    const usersRef = firestore.collection("users");
    const query = usersRef.where("username", "==", username).limit(1);

    return (await query.get()).docs[0]
}

export function postToJSON(doc: firebase.firestore.DocumentData) {
    const data = doc.data();
    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.createdAt.toMillis()
    }
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED