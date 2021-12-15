import type { NextPage } from 'next'
import { Fragment } from 'react'
import CreatePoll from '../components/CreatePoll'
import Head from 'next/head'

const CreatePage: NextPage = () => {

  return (
    <Fragment>
      <Head>
        <title>Create-Poll</title>
        <meta name="description" content="Create poll, add options and share ."/>
      </Head>
      <CreatePoll/>
    </Fragment>
  )
}

export default CreatePage
