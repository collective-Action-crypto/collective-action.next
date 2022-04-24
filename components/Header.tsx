import { useContext, useEffect, useState } from "react";
import {
  handleLogin,
  handleLogout,
  initializeOpenlogin,
} from "../util/web3auth";
import { AuthContext } from "../contexts/AuthContext";
import CreateBounty from "./CreateBounty";
import React from "react";
import { Box, Button, CircularProgress, Link, Text } from '@chakra-ui/react';
import Logo from "../assets/icons/Logo";
import { useRouter } from "next/router";
import colors from "../theme/colors";
import { ethers } from "ethers";

const Header = () => {
  const router = useRouter();
  const [openlogin, setSdk] = useState(undefined as object | undefined);
  const { setCurrentUser, authLoading, setAuthLoading, tokenBalance } = useContext(AuthContext);
  const [level, setChainLevel] = useState("l2"); // "l1" or "l2"

  const isUserLoggedIn = !!openlogin && (openlogin as any).privKey;

  useEffect(() => {
    setAuthLoading(true);
    initializeOpenlogin(level, setCurrentUser, setSdk, setAuthLoading);
  }, [level]);

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        px="200px"
        py="20px"
        borderBottomWidth="1px"
      >
        <Box width="150px">
          <Link onClick={() => router.push("/")}>
            <Logo />
          </Link>
        </Box>
        <Box display="flex" textAlign="right">
          <Button onClick={() => router.push("/explore")} borderRadius="16px" fontSize="14px" lineHeight="17px" variant="ghost" width="110px" textAlign="center" mr="24px">Explore</Button>
          {!authLoading && isUserLoggedIn && (
            <>
              <Link>
                <CreateBounty />
              </Link>
              <Button onClick={() => router.push("/disputes")} borderRadius="16px" fontSize="14px" lineHeight="17px" variant="ghost" width="110px" textAlign="center" mr="24px">Disputes</Button>
              <Box width="110px" mt="4px">
                <Text fontSize="14px" fontWeight="300" lineHeight="17px" color={colors.neutral_400} textAlign="center">Token Balance</Text>
                <Text fontSize="14px" fontWeight="400" lineHeight="17px" color={colors.neutral_600} textAlign="center">{`${ethers.utils.formatEther(tokenBalance)} Tokens`}</Text>
              </Box>
            </>
          )}
          {authLoading
            ? <Box width="110px">
                <Box ml="auto" mr="auto" borderColor="red" width="30px" mt="5px">
                  <CircularProgress ml="auto" mr="auto" size='30px' isIndeterminate color='green.300' />
                </Box>
              </Box>
            : isUserLoggedIn
              ? <Box width="110px"><Button fontSize="14px" lineHeight="17px" variant="ghost" onClick={() => {
                handleLogout(openlogin as object, setAuthLoading, false);
                setCurrentUser(undefined);
                router.push('/');
              }}>Logout</Button></Box>
              : <Box width="110px"><Button fontSize="14px" lineHeight="17px" width="110px" colorScheme="green" borderRadius="16px" onClick={() => handleLogin(openlogin as object, setAuthLoading, level, setCurrentUser)}>Login</Button></Box>
          }
        </Box>
      </Box>
    </>
  );
};

export default Header;
