import React, { createContext, useEffect, useState } from "react";
import { getTokenBalance } from "../util/ethers";
import { BigNumber } from "ethers";

// undefined as | undefined | { partnersAgreementKey: { communityAddress: string } }
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [tokenBalance, setTokenBalance] = useState(BigNumber.from(0));

  useEffect(() => {
    if (currentUser) {
      setAuthLoading(true);
      getTokenBalance(currentUser.address)
        .then(response => {
          setTokenBalance(response);
          setAuthLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          setAuthLoading(false);
        });
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        authLoading,
        setAuthLoading,
        currentUser,
        setCurrentUser,
        tokenBalance,
        setTokenBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
