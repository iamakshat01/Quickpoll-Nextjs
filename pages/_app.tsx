import type { AppProps } from 'next/app'
import '../styles/styles.css'
import { AuthProvider } from "../context/AuthContext";
import { Fragment } from 'react';
import Nav from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <AuthProvider>
        <Nav/>
        <Component {...pageProps} />
      </AuthProvider>
    </Fragment>
    
  )
}

export default MyApp
