import "../styles/global.css";
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthContextProvider } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ToastContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp
