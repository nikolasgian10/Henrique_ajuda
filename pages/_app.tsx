import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
      <Footer />
    </CookiesProvider>
  )
}
