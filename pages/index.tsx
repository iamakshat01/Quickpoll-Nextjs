import type { NextPage,GetServerSideProps } from 'next'
import { call } from '../helpers/api';
import Home from '../components/Home'

type Poll = {
	question: string
	_id: string
}

interface IProps {
  allpolls: Poll[]
}


const HomePage: NextPage<IProps> = (props) => {
  
  return (
    <>
      <Home allpolls={props.allpolls}/>
    </>
  )
}

export async function getServerSideProps(context:GetServerSideProps) {
  
  const allpolls = await call('get','api/polls');

  if (!allpolls) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {allpolls},
  }
}

export default HomePage;
