import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import TweetBox from './TweetBox'
import {RemoveScrollBar} from 'react-remove-scroll-bar'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useTweetsQuery } from "../generated/graphql";
import TweetComponent from "../components/Tweet";

function Feed() {

  const [{ data, fetching }] = useTweetsQuery();
  const [tweets, setTweets] =useState([]);

  useEffect(() => {
    if (!fetching && data?.tweets) {
      setTweets(data.tweets)
    } else if(fetching) {
      console.log("loading")
    } else {
      console.log("not found")
    }
  }, [data])

  return (
    <div className='col-span-8 border-x h-screen overflow-scroll'>
      <RemoveScrollBar />
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <ArrowPathIcon className='mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125' />
        </div>
        <div>
            <TweetBox />
            {
              tweets.length ? tweets.map(tweet => (
                <TweetComponent key={tweet.id} tweet={tweet} />
              )) : (
                <p>Nothing found</p>
              )
            }
            
        </div>
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Feed)