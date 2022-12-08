import type { NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from "react-hot-toast";
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
    <Head>
      <title>Twitter</title>
    </Head>
    <Toaster />

    <main className='grid grid-cols-9'>
      <Sidebar />
      <Feed />
    </main>
  </div>

  )
}

export default Home

