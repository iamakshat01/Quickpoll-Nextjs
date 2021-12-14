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
        // console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

  },[user])
  
  const allPollsList = props.allpolls.map((poll:Poll,i:number)=>(
    <div key={i} className='flex justify-center p-3 border-b-2 border-gray-200 bg-gray-100 hover:text-blue-700'>
      <button onClick={()=>(router.push(poll._id))}>{poll.question}</button>
    </div>
  ))
  
  const userPollsList = userPolls.map((poll:Poll,i:number)=>(
    <div key={i} className='flex justify-center p-3 border-b-2 border-gray-200 bg-gray-100 hover:text-blue-700'>
      <button onClick={()=>(router.push(poll._id))}>{poll.question}</button>
    </div>
  ))

  return (
    <>
      <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap justify-center">
              <li className="mr-4">
                  <button className="inline-flex p-4 text-sm font-medium text-center text-gray-500 border-b-2 
                  border-transparent rounded-t-lg hover:text-blue-600
                  hover:border-blue-700 focus:text-blue-600 focus:border-blue-600" onClick={()=>handleTabChange(0)}
                  >
                    All Polls
                  </button>
              </li>
              {user===true && <li className="mr-2">
                  <button className="inline-flex p-4 text-sm font-medium text-center text-gray-500 border-b-2 
                  border-transparent rounded-t-lg hover:text-blue-600 
                  hover:border-blue-700 focus:text-blue-600 focus:border-blue-600" onClick={()=>handleTabChange(1)}
                  >
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
