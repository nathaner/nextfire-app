import PostContent from "../../components/PostContent";
import { firestore, getUSerWithUsername, postToJSON } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore"
import AuthCheck from "../../components/AuthCheck";
import Heart from "../../components/Heart";
import Link from "next/link";

export async function getStaticProps({ params }) {
    const { username, slug } = params;
    
    const userDoc = await getUSerWithUsername(username)

    let post;
    let path;

    if (userDoc) {
        console.log(slug);
        
        const postRef = userDoc.ref.collection("posts").doc(slug)
        console.log((await userDoc.ref.collection("posts").get()));
        
        post = postToJSON(await postRef.get())
        path = postRef.path
    }

    return {
        props: { post, path },
        revalidate: 5000
    }
}

export async function getStaticPaths() {
    const snapshot = await firestore.collectionGroup("posts").get()

    const paths = snapshot.docs.map(doc => {
        const { slug, username } = doc.data();

        return {
            params: { username, slug }
        }
    })

    return {
        paths,
        fallback: "blocking"
    }
}

export default function Post(props) {
    const postRef = firestore.doc(props.path)
    
    const [realtimePost] = useDocumentData(postRef)

    const post = realtimePost || props.post

    return (
        <main>
            <section>
                <PostContent post={post} />
            </section>

            <aside className="card">
                <p>
                    <strong>{post.heartCount || 0} ❤️</strong>
                </p>

                <AuthCheck fallback={
                    <Link href="/enter">
                    <button>❤️ Sign up</button></Link>
                }>
                    <Heart postRef={postRef} />
                </AuthCheck>
            </aside>
        </main>
    )
}
