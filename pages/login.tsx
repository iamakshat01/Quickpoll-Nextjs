import type { NextPage } from 'next'
import { Fragment } from 'react'
import Login from '../components/Login'


const LoginPage: NextPage = () => {

  return (
    <Fragment>
      {/* <Nav auth={auth}/> */}
      <Login/>
    </Fragment>
  )
}

export default LoginPage
