import type { NextPage } from 'next'
import { Fragment } from 'react'
import Login from '../components/Login'
import Head from 'next/head'

const LoginPage: NextPage = () => {

  return (
    <Fragment>
      <Head>
        <title>Login</title>
        <meta name="description" content="Log in here for creating, sharing polls and recording responses."/>
      </Head>
      {/* <Nav auth={auth}/> */}
      <Login/>
    </Fragment>
  )
}

export default LoginPage
