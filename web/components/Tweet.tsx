import React, { useEffect, useState } from 'react'
import TimeAgo from "react-timeago";
import { ChatBubbleOvalLeftIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

function Tweet(tweet: any) {  
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
        <div className='flex space-x-3'>
            <img src='https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg' className='h-10 w-10 rounded-full object-cover' />
            <div>
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-bold'>tweet.username</p>
                    {/* <p className='hidden text-gray-500 sm:inline text-sm'>@tweet.username.replace(/\s+/g, '').toLowerCase()</p> */}

                    {/* <TimeAgo
                        className='text-sm text-gray-500'
                        date={tweet.tweet.createdAt}
                    /> */}
                </div>

                <p className='pt-1'>{tweet.tweet.text}</p>

                {/* {tweet.image && (
                    <img src={tweet.image} className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' />
                )} */}
            </div>
        </div>
        <div className='flex justify-between mt-5'>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                <ChatBubbleOvalLeftIcon className='h-5 w-5' />
            </div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                <HeartIcon className='h-5 w-5' />
            </div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                <ArrowUpTrayIcon className='h-5 w-5' />
            </div>
        </div>
    </div>
  )
}

export default Tweet