import type { NextPage,GetServerSideProps } from 'next'
import { useState,useEffect,MouseEvent, CSSProperties } from 'react';
import { useAuth } from "../context/AuthContext";
import { call } from '../helpers/api';
import { useRouter } from 'next/router'

type Poll = {
	question: string
	_id: string
}

interface IProps {
  allpolls: Poll[]
}


const HomePage: NextPage<IProps> = (props) => {
  
  const { user  } = useAuth();
  const [userPolls,setUserPolls] = useState<Poll[]>([]);
  const [tabvalue, setValue] = useState(0);
  const router = useRouter()

  function handleTabChange (newValue: number) {
    setValue(newValue);
  };
      
  const getVisibilityStyle = (hiddenCondition: boolean):CSSProperties => {
      if (hiddenCondition) {
          return {
              visibility: 'hidden',
              height: 0,
          };
      }
      return {
          visibility: 'visible',
          height: 'inherit',
      };
  };

  useEffect(()=>{
    if(user) {
      call('get','api/polls/user')
      .then((data)=>{
        setUserPolls(data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

  },[user])
  
  const allPollsList = props.allpolls.map((poll:Poll,i:number)=>(
    <div key={i} className='listItem'>
      <button onClick={()=>(router.push(poll._id))}>{poll.question}</button>
    </div>
  ))
  
  const userPollsList = userPolls.map((poll:Poll,i:number)=>(
    <div key={i} className='listItem'>
      <button onClick={()=>(router.push(poll._id))}>{poll.question}</button>
    </div>
  ))

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap justify-center">
              <li className="mr-4">
                  <button className="tabButton" onClick={()=>handleTabChange(0)}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                    All Polls
                  </button>
              </li>
              {user===true && <li className="mr-2">
                  <button className="tabButton" onClick={()=>handleTabChange(1)}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                    Your Polls
                  </button>
              </li>}
          </ul>
      </div>

      <div style={getVisibilityStyle(tabvalue !== 0)} className='container mx-auto'>
          {allPollsList}
      </div>

      {user===true && <div style={getVisibilityStyle(tabvalue !== 1)} className='container mx-auto'>
          {userPollsList}
      </div>}

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
