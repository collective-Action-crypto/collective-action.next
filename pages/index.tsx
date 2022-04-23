import { Box } from '@chakra-ui/react'
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
      <Box textAlign="center">
        <Image width={1400} height={900} src={require('/assets/images/Landing.png')} alt="" />
      </Box>
    </div>
  )
}

export default Home
