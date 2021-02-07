import { useDocument } from "react-firebase-hooks/firestore"
import { auth, firestore, increment } from "../lib/firebase"

export default function Heart({ postRef }) {
    const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid)
    const [heartDoc] = useDocument(heartRef)

    const addHeart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch()

        batch.update(postRef, { heartCount: increment(1) })
        batch.set(heartRef, { uid })

        await batch.commit()
    }

    const removeHeart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const batch = firestore.batch()

        batch.update(postRef, { heartCount: increment(-1) })
        batch.delete(heartRef)

        await batch.commit();
    }

    return heartDoc?.exists ? (
        <button onClick={removeHeart}>💔 Unheart</button>
    ) : (
            <button onClick={addHeart}>❤️ Like</button>
        )
}
