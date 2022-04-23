import {
  Box,
  Button,
  Text,
  Image,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link
} from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Header from '../../components/Header';
import colors from '../../theme/colors';
import { truncateWallet } from '../../util/truncateWallet';

const Bounty = ({ id }) => {
  return (
    <>
      <Header />
      <Box borderWidth="1px" borderColor={colors.neutral_100} p="32px" display="flex" borderRadius="24px" width="1288px" mt="56px" ml="auto" mr="auto">
        <Box flex={1} width="585px" height="500px" borderRadius="8px" my="36px" mr="54px" overflow="hidden">
          <Image src={'https://www.penthousepantherclub.com/pharaoh_small.png'} width="585px" height="500px"  alt='' />
        </Box>
        <Box flex={1}>
          <Text fontWeight="600" fontSize="30px" lineHeight="150%" letterSpacing="0.01em" color={colors.neutral_900}>
            Pellentesque suscipit fringilla libero eu ullamcorper.
          </Text>
          <Box>
            <Text></Text>
          </Box>
          <Box mt="24px" mb="32px">
            <Text fontWeight="400" fontSize="14px" lineHeight="150%" color={colors.neutral_600}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
          </Box>
          <Box py="32px" borderTopWidth="1px" borderBottomWidth="1px" borderTopColor={colors.neutral_200} borderBottomColor={colors.neutral_200}>
            <Box display="flex">
              <Box mr="24px">
                <Text fontWeight="400" fontSize="32px" lineHeight="38px" color={colors.neutral_900}>$ 10,000</Text>
              </Box>
              <Box mt="11px">
                <Text fontWeight="400" fontSize="14px" lineHeight="17px" letterSpacing="0.01em" color={colors.neutral_500}>80% of $15,000 Funded</Text>
              </Box>
            </Box>
            <Box mt="16px">
              <Progress colorScheme='green' size='md' value={80} borderRadius="4px"/>
            </Box>
            <Box mt="16px" display="flex" justifyContent="space-between">
              <Box>
                <Text fontSize="16px" lineHeight="19px">2 days left</Text>
              </Box>
              <Box display="flex">
                <Text fontWeight="400" fontSize="16px" lineHeight="19px" mr="5px">Status: </Text>
                <Text fontWeight="400" fontSize="16px" lineHeight="19px" color="green">Active</Text>
              </Box>
            </Box>
          </Box>
          <Box mt="24px" display="flex" justifyContent="space-between">
            <Box>
              <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px" colorScheme='green' mr={3} onClick={() => console.log("Participate in Bounty")}>
                Participate in Bounty
              </Button>
            </Box>
            <Box mt="5px">
              <Text color={colors.neutral_500} fontWeight="400" fontSize="14px" lineHeight="17px">567+ Participants</Text>
            </Box>
          </Box>
          <Box mt="24px">
            <span style={{color: 'green', fontWeight: 600, fontSize: 14, lineHeight: '150%'}}>Note:  </span>
            <span style={{color: colors.neutral_500, fontWeight: 400, fontSize: 14, lineHeight: '150%'}}>Anyone who donates for a bounty gets a total of 1 Collective Action (CA) per 1 USDC spent. One CA counts as one vote during a dispute.</span>
          </Box>
        </Box>
      </Box>


      {/* Submission */}
      <Box width="1288px" ml="auto" mr="auto" borderWidth="1px" mt="36px" borderRadius="24px" mb="80px">
        <Box display="flex" justifyContent="space-between" py="32px" px="32px" borderBottomWidth="1px" borderBottomColor={colors.neutral_200}>
          <Box mt="10px">
            <Text fontWeight="500" fontSize="24px" lineHeight="28px" letterSpacing="0.01em">Submission</Text>
          </Box>
          <Box>
            <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px" colorScheme='green' mr={3} onClick={() => console.log("Submit Claim")}>
              Submit Claim
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Wallet Address</Th>
                <Th>Link to Proof</Th>
                <Th isNumeric>Dispute?</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{truncateWallet('0x24A2d17147F177F5a5d3e50C7717eC58Ccf44dE5', 15)}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Open Dispute')}>Open Dispute</Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{truncateWallet('0x24A2d17147F177F5a5d3e50C7717eC58Ccf44dE5', 15)}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px" variant='ghost'onClick={() => console.log('Open Dispute')}>Open Dispute</Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{truncateWallet('0x24A2d17147F177F5a5d3e50C7717eC58Ccf44dE5', 15)}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Open Dispute')}>Open Dispute</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default Bounty;