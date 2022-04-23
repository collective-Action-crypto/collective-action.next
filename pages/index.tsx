import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Collective Action</title>
        <meta name="description" content="Collective Action" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <img width="1288px" height="800px" src='/assets/images/Landing.png' alt="" />
    </div>
  )
}

export default Home
