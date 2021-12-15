import type { NextPage } from 'next';
import React from 'react';
import {call} from '../helpers/api';
import Poll from '../components/Poll';

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

type Params = {
	params: {
		pollID: string
	}
}

interface IProps {
    poll: SinglePoll
}


const PollPage: NextPage<IProps> = (props) => {

  return (
        <>
            <Poll poll={props.poll}/>
        </>
  )
}



export async function getServerSideProps({ params }: Params) {
    
    const id = params.pollID;
    const poll = await call('get',`api/polls/${id}`);
    if (!poll) {
        return {
        redirect: {
            destination: '/',
            permanent: false,
        },
        }
    }

    return {
        props: {poll},
    }
}
  

export default PollPage
