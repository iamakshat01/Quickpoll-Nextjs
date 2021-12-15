import React,{useState,useEffect} from 'react';
import {call} from '../helpers/api';
import {
    EmailShareButton,
    EmailIcon,
    FacebookIcon,
    FacebookShareButton,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";
import { VictoryPie } from "victory";
import Notification from '../components/Notification';

const base = 'localhost:3000'

type Option = {
    votes: number,
    _id: string,
    option: string
}

type SinglePoll = {
    question: string
    _id: string
    options: Option[]
}


interface IProps {
    poll: SinglePoll
}


const Poll: React.FC<IProps> = (props) => {
  
  const [answer, setAnswer] = useState(false);
  const [responses, setResponses] = useState<Option[]>([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  useEffect(()=>{
    call('get',`api/polls/${props.poll._id}`)
    .then((data)=>{
        setResponses(data.options)
    })
    .catch((err)=>{
        console.log(err);
    })
  },[answer,props.poll._id])

  function viewAnswer() {
    setAnswer(!answer);
  }

  function refresh() {
    
    call('get',`api/polls/${props.poll._id}`)
    .then((data)=>{
        setResponses(data.options)
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  function handleVote(pollId: string,option: string) {
    call('post',`api/polls/${pollId}`,{answer:option})
    .then((data)=>{
        refresh();
        setNotify({
            isOpen: true,
            message: 'Voted Successfully',
            type: 'success'
        })
    })
    .catch((err)=>{
        setNotify({
            isOpen: true,
            message: 'Already Voted',
            type: 'error'
        })
        console.log(err);
    })
  }

  const options=props.poll.options.map((option,i)=>(
    <button key={i} onClick={()=>handleVote(props.poll._id,option.option)} className='text-lg m-4 text-white bg-yellow-500 hover:bg-yellow-600 p-2 rounded-xl'>
        {option.option}
    </button>
  ))

  const allresponse=responses.map((response,i)=>(
    <span key={i} className='text-lg m-4 text-white bg-green-600 hover:bg-green-600 p-2 rounded-xl'>
        <h1>{response.option}</h1>
        <h2 className='text-center'>{response.votes}</h2>
    </span>
    
  ))

  return (
        <div className='container mx-auto mt-10'>
            
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <div className='flex justify-center bg-red-100 p-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <h1 className="text-3xl">{props.poll.question}</h1>
            </div>

            <div className="flex justify-center mt-10">
                {options}
            </div>

            <h6 className="flex justify-center mt-5 text-gray-800" >Share It On!</h6>

            <div className="flex justify-center mt-5">
                
                <FacebookShareButton
                url={base+'/poll/'+props.poll._id}
                quote={props.poll.question} 
                className="m-2">
                <FacebookIcon size={32} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                url={base+'/poll/'+props.poll._id}
                title={props.poll.question}
                className="m-2">
                <TwitterIcon size={32} round={true} />
                </TwitterShareButton>


                <WhatsappShareButton
                url={base+'/poll/'+props.poll._id}
                title= {props.poll.question}
                className="m-2">
                <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>


                <LinkedinShareButton
                url={base+'/poll/'+props.poll._id}
                title={props.poll.question}
                className="m-2">
                <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>


                <EmailShareButton
                url={base+'poll/'+props.poll._id}
                title={props.poll.question}
                className="m-2">
                <EmailIcon size={32} round={true} />
                </EmailShareButton>
            
            </div>

            <div className='flex justify-center mt-10'>
                <button className="submitButton mx-4" onClick={viewAnswer}>
                    Responses
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                </button>
                <button className="bg-red-700 mx-4 rounded-lg p-2 hover:bg-red-500" onClick={refresh}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
            

            {answer===true && <div className="flex justify-center mt-10">
                {allresponse}
            </div>}


            {answer===true && <div className="flex justify-center sm:w-full md:w-3/5 mx-auto">
                <VictoryPie 
                    data={responses}
                    startAngle={50}
                    endAngle={450}
                    height={300}
                    animate={{
                        duration: 2000
                    }}
                    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                    x={(data)=> data.votes>0?data.option:null}
                    y={(data)=> data.votes>0?data.votes:null} 
                    style={{ 
                        labels: { fill: "black", fontSize: 8, fontWeight: "bold" },
                        data: {
                            fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 1
                        }
                    }} 
                />
            </div>}
        </div>
  )
}




export default Poll;
