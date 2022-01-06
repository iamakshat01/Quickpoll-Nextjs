import type { NextPage,GetServerSideProps } from 'next'
import { call } from '../helpers/api';
import Home from '../components/Home';
import Head from 'next/head';

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
      <Head>
        <title>Quick-Poll</title>
        <meta name="description" content="A utility web app for creating, sharing polls and recording responses."/>
      </Head>
      <Home allpolls={props.allpolls}/>
    </>
  )
}

export async function getStaticProps() {
  
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
    revalidate: 1000,
  }
}

export default HomePage;
