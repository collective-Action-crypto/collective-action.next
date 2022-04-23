import { NextPage } from 'next';
import React from 'react';
import {
  Box,
  Button,
  Heading,
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
import { truncateWallet } from '../util/truncateWallet';
import colors from '../theme/colors';

const Explore: NextPage = () => {
  return (
    <>
      <Box as='h1' textAlign={'center'} mt="30px">
        <Heading>
          My Disputes
        </Heading>
      </Box>
      <Box>
        
      </Box>

      <Box width="1400px" ml="auto" mr="auto" borderWidth="1px" mt="36px" borderRadius="24px" mb="80px">
        <Box display="flex" justifyContent="space-between" py="32px" px="32px" borderBottomWidth="1px" borderBottomColor={colors.neutral_200}>
          <Box mt="10px">
            <Text fontWeight="500" fontSize="24px" lineHeight="28px" letterSpacing="0.01em">Dispute Votes (28 active)</Text>
          </Box>
        </Box>

        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Submitter Proof</Th>
                <Th>Disputer Proof</Th>
                <Th isNumeric>Your Vote to Support</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">1</Td>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{"The first dispute for taking care of Ukrainian refugees."}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Suport Submitter')}>Submitter</Button>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Support Disputer')}>Disputer</Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">2</Td>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{"The second dispute for taking care of Ukrainian refugees."}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Suport Submitter')}>Submitter</Button>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Support Disputer')}>Disputer</Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">3</Td>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{"The third dispute for taking care of Ukrainian refugees."}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Suport Submitter')}>Submitter</Button>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Support Disputer')}>Disputer</Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">4</Td>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{"The third dispute for taking care of Ukrainian refugees."}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Suport Submitter')}>Submitter</Button>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Support Disputer')}>Disputer</Button>
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">5</Td>
                <Td fontWeight="400" fontSize="14px" lineHeight="17px">{"The third dispute for taking care of Ukrainian refugees."}</Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td color={'#598CF4'}><Link>{`https://www.google.com/`}</Link></Td>
                <Td isNumeric>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Suport Submitter')}>Submitter</Button>
                  <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost'onClick={() => console.log('Support Disputer')}>Disputer</Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default Explore;
