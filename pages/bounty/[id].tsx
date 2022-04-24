import {
  Box,
  Image,
  Link,
  Progress,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OpenDispute from "../../components/OpenDispute";
import Participate from "../../components/Participate";
import SubmitClaim from "../../components/SubmitClaim";
import colors from "../../theme/colors";
import { truncateWallet } from "../../util/truncateWallet";
import { getAction, getSubmissions } from "../../util/ethers";
import { BigNumber, ethers } from "ethers";
import { getFromIPFS } from "../../util/tatum";

const Bounty = () => {
  const router = useRouter();
  const { id } = router.query;

  const [action, setAction] = useState({
    title: "",
    description: "",
    image: "",
    amount: "",
    eligibleSubmittersCount: "",
    status: "",
    creationDate: 0,
    endDate: 0,
    progress: 0.0,
    daysLeft: 0,
  });

  const [submissions, setSubmissions] = useState(
    [] as {
      submitter: string;
      proof: string;
      failed: boolean;
    }[]
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    const currentId = BigNumber.from(id);
    getAction(currentId).then(async (a) => {
      const data = (await getFromIPFS(a.metadata)) as {
        title: string;
        description: string;
        requirements: string;
      };

      const creationDate = a.creationDate.toNumber();
      const endDate = a.endDate.toNumber();
      const secondsNow = new Date().getTime() / 1000;

      setAction({
        title: data.title,
        description: data.description,
        image: "https://ipfs.io/ipfs/" + a.image,
        amount: ethers.utils.formatEther(a.amount),
        eligibleSubmittersCount: a.eligibleSubmittersCount.toString(),
        status: a.settled
          ? "Finished"
          : a.endDate.toNumber() < new Date().getTime() / 1000
          ? "Dispute only period"
          : "Active",
        creationDate: creationDate,
        endDate: endDate,
        progress: (secondsNow - creationDate) / (endDate - creationDate),
        daysLeft: Math.floor((endDate - secondsNow) / 24 / 3600),
      });
    });

    getSubmissions(currentId).then((s) => {
      console.log("subs", s);
      setSubmissions(s);
    });
  }, [id]);

  return (
    <>
      <Box
        borderWidth="1px"
        borderColor={colors.neutral_100}
        p="32px"
        display="flex"
        borderRadius="24px"
        width="1288px"
        mt="56px"
        ml="auto"
        mr="auto"
      >
        <Box
          flex={1}
          width="585px"
          height="500px"
          borderRadius="8px"
          my="36px"
          mr="54px"
          overflow="hidden"
        >
          <Image src={action.image} width="585px" height="500px" alt="" />
        </Box>
        <Box flex={1}>
          <Text
            fontWeight="600"
            fontSize="30px"
            lineHeight="150%"
            letterSpacing="0.01em"
            color={colors.neutral_900}
          >
            {action.title}
          </Text>
          <Box>
            <Text></Text>
          </Box>
          <Box mt="24px" mb="32px">
            <Text
              fontWeight="400"
              fontSize="14px"
              lineHeight="150%"
              color={colors.neutral_600}
            >
              {action.description}
            </Text>
          </Box>
          <Box
            py="32px"
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderTopColor={colors.neutral_200}
            borderBottomColor={colors.neutral_200}
          >
            <Box display="flex">
              <Box mr="24px">
                <Text
                  fontWeight="400"
                  fontSize="32px"
                  lineHeight="38px"
                  color={colors.neutral_900}
                >
                  {action.amount} MATIC
                </Text>
              </Box>
            </Box>
            <Box mt="16px">
              <Progress
                colorScheme="green"
                size="md"
                value={action.progress}
                borderRadius="4px"
              />
            </Box>
            <Box mt="16px" display="flex" justifyContent="space-between">
              <Box>
                <Text fontSize="16px" lineHeight="19px">
                  {action.daysLeft} {action.daysLeft == 1 ? "day" : "days"} left
                </Text>
              </Box>
              <Box display="flex">
                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="19px"
                  mr="5px"
                >
                  Status:{" "}
                </Text>
                <Text
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="19px"
                  color="green"
                >
                  {action.status}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box mt="24px" display="flex" justifyContent="space-between">
            <Box>
              <Participate />
            </Box>
            <Box mt="5px">
              <Text
                color={colors.neutral_500}
                fontWeight="400"
                fontSize="14px"
                lineHeight="17px"
              >
                {action.eligibleSubmittersCount} Participants
              </Text>
            </Box>
          </Box>
          <Box mt="24px">
            <span
              style={{
                color: "green",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: "150%",
              }}
            >
              Note:{" "}
            </span>
            <span
              style={{
                color: colors.neutral_500,
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "150%",
              }}
            >
              Anyone who donates for a bounty gets a total of 1 Collective
              Action (CA) per 1 MATIC spent. One CA counts as one vote during a
              dispute.
            </span>
          </Box>
        </Box>
      </Box>

      {/* Submission */}
      <Box
        width="1288px"
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
              Submission
            </Text>
          </Box>
          <Box>
            <SubmitClaim id={id} />
          </Box>
        </Box>

        <TableContainer>
          <Table variant="simple">
            {submissions.length != 0 && (
              <>
                <Thead>
                  <Tr>
                    <Th>Wallet Address</Th>
                    <Th>Link to Proof</Th>
                    <Th isNumeric>Dispute?</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions.map((s, i) => (
                    <Tr key={i}>
                      <Td fontWeight="400" fontSize="14px" lineHeight="17px">
                        {truncateWallet(s.submitter, 15)}
                      </Td>
                      <Td color={"#598CF4"}>
                        <Link>{s.proof}</Link>
                      </Td>
                      <Td isNumeric>
                        <OpenDispute />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </>
            )}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default Bounty;
