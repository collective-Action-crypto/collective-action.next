import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';

const Explore: NextPage = () => {
  return (
    <>
      <Box as='h1' borderWidth="2px" textAlign={'center'} mt="30px">
        <Heading>
          Explore
        </Heading>
      </Box>
      <Box textAlign="center" borderColor='red'  ml="auto" mr="auto" mt="40px">
        <Tabs variant='soft-rounded' colorScheme='green' borderWidth="1px" borderColor="blue">
          <TabList borderWidth="2px">
            <Tab mr="10px">All</Tab>
            <Tab mr="10px">Active</Tab>
            <Tab mr="10px">In Dispute</Tab>
            <Tab mr="10px">Completed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>all!</p>
            </TabPanel>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default Explore;
