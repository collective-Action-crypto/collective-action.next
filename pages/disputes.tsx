import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
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
  Link,
  useConst,
} from "@chakra-ui/react";
import { truncateWallet } from "../util/truncateWallet";
import colors from "../theme/colors";
import { dispute } from "../util/helper";
import { getListOfDisputes } from "../util/ethers";
import { AuthContext } from "../contexts/AuthContext";

const Dispute: NextPage = () => {
  const currentUser = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState(undefined as dispute[] | undefined);
  console.log("currUser", currentUser);
  useEffect(() => {
    getListOfDisputes(
      currentUser.currentUser && (currentUser.currentUser as any).walletAddress
    ).then((disputes) => {
      setDisputes(disputes as dispute[]);
      setLoading(false);
    });
  }, [currentUser.currentUser]);
  if (!loading) {
    return (
      <>
        <Box as="h1" textAlign={"center"} mt="30px">
          <Heading>My Disputes</Heading>
        </Box>
        <Box></Box>

        <Box
          width="1400px"
          ml="auto"
          mr="auto"
          borderWidth="1px"
          mt="36px"
          borderRadius="24px"
          mb="80px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            py="32px"
            px="32px"
            borderBottomWidth="1px"
            borderBottomColor={colors.neutral_200}
          >
            <Box mt="10px">
              <Text
                fontWeight="500"
                fontSize="24px"
                lineHeight="28px"
                letterSpacing="0.01em"
              >
                Dispute Votes (28 active)
              </Text>
            </Box>
          </Box>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Creator</Th>
                  <Th>Submitter Proof</Th>
                  <Th>Disputer Proof</Th>
                  <Th isNumeric>Votes</Th>
                </Tr>
              </Thead>
              <Tbody>
                {disputes
                  ? disputes.map((dispute, index) => (
                      <Tr key={index}>
                        <Td fontWeight="400" fontSize="14px" lineHeight="17px">
                          {index}
                        </Td>
                        <Td fontWeight="400" fontSize="14px" lineHeight="17px">
                          {dispute.creator}
                        </Td>
                        <Td color={"#598CF4"}>
                          <Link>{`https://ipfs.io/ipfs/${dispute.forProof}`}</Link>
                        </Td>
                        <Td color={"#598CF4"}>
                          <Link>{`https://ipfs.io/ipfs/${dispute.disputeProof}`}</Link>
                        </Td>
                        {dispute.alreadyVoted && currentUser.currentUser ? (
                          <Td isNumeric>
                            <Button
                              fontWeight="500"
                              fontSize="14px"
                              lineHeight="17px"
                              borderRadius="16px"
                              variant="ghost"
                              onClick={() => console.log("Suport Submitter")}
                            >
                              Submitter
                            </Button>
                            <Button
                              fontWeight="500"
                              fontSize="14px"
                              lineHeight="17px"
                              borderRadius="16px"
                              variant="ghost"
                              onClick={() => console.log("Support Disputer")}
                            >
                              Disputer
                            </Button>
                          </Td>
                        ) : (
                          <Td
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="17px"
                          >
                            {dispute.forVotes}:{dispute.againstVotes}
                            (For:Against)
                          </Td>
                        )}
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  } else return null;
};

export default Dispute;
