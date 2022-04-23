import { Box, Button, Link } from '@chakra-ui/react';
import React from 'react';

const Header = () => {
  return (
    <Box borderWidth="1px" display="flex" justifyContent={"space-around"} mx="300px" py="20px">
      <Box flex={3} borderWidth="1px" pl="50px">
        <Link>LOGO</Link>
      </Box>
      <Box flex={1} display="flex" borderWidth="1px">
        <Link mr="30px">Explore</Link>
        <Link mr="30px">Create</Link>
        <Button>Profile</Button>
      </Box>
    </Box>
  )
}

export default Header;