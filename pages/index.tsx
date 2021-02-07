import Head from 'next/head'
import { useState } from 'react'
import Loader from '../components/Loader'
import PostFeed from '../components/PostFeed'
import { firestore, fromMillis, postToJSON } from '../lib/firebase'

const LIMIT = 1

export async function getServerSideProps(context) {
  const postQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(LIMIT)

  const posts = (await postQuery.get()).docs.map(postToJSON)

  return {
    props: { posts }
  }
}

export default function Home(props) {

  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true)
    const last = posts[posts.length - 1]

    const cursor = typeof last.createdAt === "number" ? fromMillis(last.createdAt) : last.createdAt

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT)

    const newPosts = (await query.get()).docs.map(doc => doc.data())

    if (newPosts.length === 0) setPostsEnd(true)
    
    setPosts(posts.concat(newPosts));
  
    setLoading(false)
  }


  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && "You have reached the end."}

    </main>
  )
}
