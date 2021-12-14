import type { NextPage } from 'next'
import { Fragment,useState,useEffect } from 'react'
import Nav from '../components/Navbar'
import { isAuthenticated,setToken } from '../helpers/api'
const Home: NextPage = () => {

  const [auth, setAuth] = useState<Boolean>(true);
  
  useEffect(() => {
    setAuth(isAuthenticated());
    setToken(localStorage.getItem('jwtToken'));
  }, []);

  const handleLogIn = (auth:boolean) => {
    setAuth(auth);
  };

  return (
    <Fragment>
      <Nav auth={auth}/>
    </Fragment>
  )
}

export default Home
