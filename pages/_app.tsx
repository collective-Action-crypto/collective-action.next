import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/web3auth';
import {SafeEventEmitterProvider } from "@web3auth/base";
import { handleLogin, initializeOpenlogin } from '../util/web3auth';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false as boolean);
  const [openlogin, setSdk] = useState(undefined  as object|undefined);
  const [walletInfo, setUserAccountInfo] = useState(null as object|null);
  const [level, setChainLevel] = useState("l2"); // "l1" or "l2"
useEffect(()=>{
  setLoading(true)
  initializeOpenlogin(level,setUserAccountInfo,setSdk,setLoading);
},[level])
  return (
      <>
      {
      loading ?
        <div>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", margin: 20 }}>
                <h1>....loading</h1>
            </div>
        </div> :<div>
        {
          (openlogin && (openlogin as any).privKey) ?
          <div>
            <span>Connected to : { level === "l1" ? "Goerli Network":  "Mumbai Matic testnet"} </span> 
          </div>:
            <div className="loginContainer">
                <h1 style={{ textAlign: "center" }}>Openlogin x Polygon</h1>
                <div onClick={()=>handleLogin(openlogin as object,setLoading,level,setUserAccountInfo)} className="btn">
                  Login
                </div>
            </div>
        }

      </div>
    }
    </>
  )
}
// <Component {...pageProps} />
export default MyApp
