import "../styles/global.css";
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthContextProvider } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from 'ethers';

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ToastContainer />
        <Layout>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
          </Web3ReactProvider>
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp
