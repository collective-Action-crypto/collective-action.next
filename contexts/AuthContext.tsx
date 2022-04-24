import React, {createContext, useEffect, useState} from 'react';
import { getTokenBalance } from '../util/ethers';

// undefined as | undefined | { partnersAgreementKey: { communityAddress: string } }
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if(currentUser) {
      setAuthLoading(true);
      getTokenBalance(currentUser.address)
        .then(response => {
          const balance = parseInt(response.toString());
          setTokenBalance(balance);
          setAuthLoading(false);
        })
        .catch(error => {
          console.warn(error);
          setAuthLoading(false);
        });
    }
  }, [currentUser])

  return (
    <AuthContext.Provider
      value={{
        authLoading,
        setAuthLoading,
        currentUser,
        setCurrentUser,
        tokenBalance,
        setTokenBalance
      }}>
      {children}
    </AuthContext.Provider>
  )
}
