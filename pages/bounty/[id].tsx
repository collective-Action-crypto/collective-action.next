import { Box, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';

const Bounty = ({ id }) => {
  return (
    <Box>
      <Text>{`Bounty #${id}`}</Text>
    </Box>
  );
}
export default Bounty;