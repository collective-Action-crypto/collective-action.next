import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getListOfActions } from "../util/ethers";
import { action } from "../util/helper";
import { Spinner } from "@chakra-ui/react";

const Explore: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState(undefined as action[] | undefined);

  useEffect(() => {
    getListOfActions().then((actions) => {
      console.log("fbuenikm", actions);
      setActions(actions as action[]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Box as="h1" textAlign={"center"} mt="30px">
        <Heading>Explore</Heading>
      </Box>

      {loading ? (     <Box textAlign="center" mt="100px">
          <Spinner color="green.300" size="xl" />
        </Box>
      ) : (
        <Box textAlign="center" ml="auto" mr="auto" mt="40px">
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList display="flex" justifyContent="center">
              <Tab mr="10px">All</Tab>
              <Tab mr="10px">Active</Tab>
              <Tab mr="10px">In Dispute</Tab>
              <Tab mr="10px">Completed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-evenly"}
                  width="1400px"
                  ml="auto"
                  mr="auto"
                  py="20px"
                >
                  {actions
                    ? actions.map((action, index) => {
                        return (
                          <Card
                            title={action.title}
                            description={action.description}
                            imageUrl={action.image}
                            walletAddress={action.creator}
                            key={index}
                            id={index}
                            participantsCount={action.participants}
                            daysLeft={Math.floor(
                              (action.endDate - new Date().getTime() / 1000) /
                                24 /
                                3600
                            )}
                          />
                        );
                      })
                    : null}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-evenly"}
                  width="1400px"
                  ml="auto"
                  mr="auto"
                  py="20px"
                >
                  {actions
                    ? actions
                        .filter(
                          (action) =>
                            new Date(action.endDate * 1000) >= new Date()
                        )
                        .map((action, index) => {
                          return (
                            <Card
                              title={action.title}
                              description={action.description}
                              imageUrl={action.image}
                              walletAddress={action.creator}
                              key={index}
                              id={index}
                              participantsCount={action.participants}
                              daysLeft={Math.floor(
                                (action.endDate - new Date().getTime() / 1000) /
                                  24 /
                                  3600
                              )}
                            />
                          );
                        })
                    : null}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-evenly"}
                  width="1400px"
                  ml="auto"
                  mr="auto"
                  py="20px"
                >
                  {actions
                    ? actions
                        .filter(
                          (action) =>
                            new Date(action.endDate * 1000) < new Date() &&
                            !action.settled
                        )
                        .map((action, index) => {
                          return (
                            <Card
                              title={action.title}
                              description={action.description}
                              imageUrl={action.image}
                              walletAddress={action.creator}
                              key={index}
                              id={index}
                              participantsCount={action.participants}
                              daysLeft={Math.floor(
                                (action.endDate - new Date().getTime() / 1000) /
                                  24 /
                                  3600
                              )}
                            />
                          );
                        })
                    : null}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-evenly"}
                  width="1400px"
                  ml="auto"
                  mr="auto"
                  py="20px"
                >
                  {actions
                    ? actions
                        .filter(
                          (action) =>
                            new Date(action.endDate * 1000) < new Date() &&
                            action.settled
                        )
                        .map((action, index) => {
                          return (
                            <Card
                              title={action.title}
                              description={action.description}
                              imageUrl={action.image}
                              walletAddress={action.creator}
                              key={index}
                              id={index}
                              participantsCount={action.participants}
                              daysLeft={Math.floor(
                                (action.endDate - new Date().getTime() / 1000) /
                                  24 /
                                  3600
                              )}
                            />
                          );
                        })
                    : null}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </>
  );
};

export default Explore;
