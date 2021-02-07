import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { UserContext } from '../lib/context'
import '../styles/globals.css'
import { userUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = userUserData();
  
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
