import Head from 'next/head'
import Loader from '../components/Loader'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Loader show />
      <div><h1>Hi there 🔥</h1></div>
    </div>
  )
}
