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
import { callSmartContractFunction } from "../util/tatum";
const vote_abi = {
  inputs: [
    {
      internalType: "uint256",
      name: "actionId",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "disputeId",
      type: "uint256",
    },
    {
      internalType: "bool",
      name: "voteFor",
      type: "bool",
    },
  ],
  name: "vote",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};
const Dispute: NextPage = () => {
  const currentUser = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState(undefined as dispute[] | undefined);

  useEffect(() => {
    getListOfDisputes(
      currentUser.currentUser && (currentUser.currentUser as any).address
    ).then((disputes) => {
      debugger;
      setDisputes(disputes as dispute[]);
      setLoading(false);
    }).catch(err => {
      debugger;
    });
  }, []);

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
                Dispute Votes ({disputes ? disputes.length : 0} active)
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
                  ? disputes.map((dispute, index) => {
                    return (
                      <Tr key={index}>
                        <Td fontWeight="400" fontSize="14px" lineHeight="17px">
                          {index}
                        </Td>
                        <Td fontWeight="400" fontSize="14px" lineHeight="17px">
                          {dispute.creator}
                        </Td>
                        <Td color={"#598CF4"}>
                          <a target="_blank" href={`https://ipfs.io/ipfs/${dispute.forProof}`} rel="noopener noreferrer">View Proof</a>
                        </Td>
                        <Td color={"#598CF4"}>
                          <a target="_blank" href={`https://ipfs.io/ipfs/${dispute.disputeProof}`} rel="noopener noreferrer">View Proof</a>
                        </Td>
                        {dispute.alreadyVoted && currentUser.currentUser ? (
                          <Td isNumeric>
                            <Button
                              fontWeight="500"
                              fontSize="14px"
                              lineHeight="17px"
                              borderRadius="16px"
                              variant="ghost"
                              onClick={() =>
                                callSmartContractFunction(
                                  "vote",
                                  vote_abi,
                                  [
                                    dispute.action.toString(),
                                    dispute.disputeId.toString(),
                                    "false",
                                  ],
                                  "0",
                                  (currentUser.currentUser as any).privateKey
                                )
                              }
                            >
                              Submitter
                            </Button>
                            <Button
                              fontWeight="500"
                              fontSize="14px"
                              lineHeight="17px"
                              borderRadius="16px"
                              variant="ghost"
                              onClick={() =>
                                callSmartContractFunction(
                                  "vote",
                                  vote_abi,
                                  [
                                    dispute.action.toString(),
                                    dispute.disputeId.toString(),
                                    "true",
                                  ],
                                  "0",
                                  (currentUser.currentUser as any).privateKey
                                )
                              }
                            >
                              Disputer
                            </Button>
                          </Td>
                        ) : (
                          <Td
                            fontWeight="400"
                            fontSize="14px"
                            lineHeight="17px"
                            isNumeric
                          >
                            {`${dispute.forVotes.toString()} (Submitter) : ${dispute.againstVotes.toString()} (Disputer)`}
                          </Td>
                        )}
                      </Tr>
                    )
                  })
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
