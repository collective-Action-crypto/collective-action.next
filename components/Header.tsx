import { Box, Button, CircularProgress, Link } from '@chakra-ui/react';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { handleLogin, handleLogout, initializeOpenlogin } from '../util/web3auth';
import { AuthContext } from '../contexts/AuthContext';
import CreateBounty from './CreateBounty';


const Header = () => {
  const [loading, setLoading] = useState(false as boolean);
  const [openlogin, setSdk] = useState(undefined  as object|undefined);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [level, setChainLevel] = useState("l2"); // "l1" or "l2"

  const isUserLoggedIn = !!openlogin && (openlogin as any).privKey;

  useEffect(() => {
    setLoading(true);
    initializeOpenlogin(level, setCurrentUser, setSdk, setLoading);
  }, [level])

  return (
    <>
      <Box borderWidth="1px" display="flex" justifyContent={"space-around"} mx="300px" py="20px">
        <Box flex={3} borderWidth="1px" pl="50px">
          <Link>LOGO</Link>
        </Box>
        <Box flex={1} display="flex" borderWidth="1px">
          <Link mr="30px">Explore</Link>
          <Link mr="30px">
            <CreateBounty />
          </Link>
          {loading
            ? <CircularProgress size='30px' isIndeterminate color='green.300' />
            : isUserLoggedIn
              ? <Button onClick={() => handleLogout(openlogin as object, setLoading, false)}>Logout</Button>
              : <Button onClick={() => handleLogin(openlogin as object, setLoading, level, setCurrentUser)}>Login</Button>
          }
        </Box>
      </Box>
    </>
  )
}

export default Header;