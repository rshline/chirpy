import React, { useEffect, useState } from 'react'
import {
    UserIcon,
    HomeIcon,
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import SidebarRow from './SidebarRow'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';

function Sidebar() {

  const [{ fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });


  const router = useRouter()

  const [body, setBody] = useState<JSX.Element>(
    <>
      <SidebarRow 
        onClick={() => (router.push("/login"))}
        Icon={ArrowLeftOnRectangleIcon} 
      />
    </>  
  )

  useEffect(() => {
    if (!fetching) {
      if(data?.me?.name) {
        setBody(
          <>
            <SidebarRow 
            onClick={() => logout}
            Icon={ArrowRightOnRectangleIcon} 
            />    
            <p>{data.me.name}</p>   
          </>        
        )
      }
    } 
  }, [])

  return (
    <div className='flex flex-col items-center px-2 md:items-start lg:ml-8'>
      <img className='m-3 h-10 w-10' src='https://ra.ac.ae/wp-content/uploads/2020/01/logo-twitter-icon-symbol-0.png' alt='' />
      <SidebarRow Icon={HomeIcon} />
      {/* <SidebarRow 
        onClick={data?.me ? () => logout : () => login}
        Icon={data?.me ? ArrowRightOnRectangleIcon : ArrowLeftOnRectangleIcon} 
      />
      <h1>{data? ? data.me.name : "login"}</h1> */}
      {body}
    </div>
  )
}

export default Sidebar