import React, {createContext, useState} from 'react';

// undefined as | undefined | { partnersAgreementKey: { communityAddress: string } }
export const AuthContext = createContext({
  currentUser: undefined,
  setCurrentUser: () => null,
});

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}
