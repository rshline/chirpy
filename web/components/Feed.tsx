import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import TweetBox from './TweetBox'
import {RemoveScrollBar} from 'react-remove-scroll-bar'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useTweetsQuery } from "../generated/graphql";
import TweetComponent from "../components/Tweet";

function Feed() {

  const [{ data }] = useTweetsQuery();
  const [tweets, setTweets] =useState<JSX.Element>();
  console.log(data)

  useEffect(() => {
    if(data?.tweets){
      data.tweets.map((tweet) => (
        setTweets(
          <>
            <TweetComponent key={tweet.id} tweet={tweet} />
          </>          
        )
      ))
    }
  }, [data])

  return (
    <div className='col-span-8 border-x max-h-screen overflow-scroll overflow-x-hidden scrollbar-hide'>
      <RemoveScrollBar />
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <ArrowPathIcon className='mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125' />
        </div>
        <div>
            <TweetBox />
            <div>
              {tweets}
            </div>
        </div>
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Feed)