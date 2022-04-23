import { Box, Image, Link, Progress, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import colors from '../theme/colors';
import { truncateWallet } from "../util/truncateWallet";

const Card = ({ id, title, description, imageUrl, walletAddress, participantsCount, daysLeft }) => {
  const router = useRouter();
  const percentFunded = 0;

  return (
    <Link onClick={() => router.push(`/bounty/${id}`)} mt="20px" width="307px" height="488px" borderWidth="1px" borderColor={colors.neutral_100} p="20px" borderRadius="24px" _hover={{borderColor: 'rgb(0,128,0,0.4)', boxShadow: `0px 50px 20px rgba(92, 92, 92, 0.01), 0px 28px 17px rgba(92, 92, 92, 0.02), 0px 12px 12px rgba(92, 92, 92, 0.04), 0px 3px 7px rgba(92, 92, 92, 0.05), 0px 0px 0px rgba(92, 92, 92, 0.05)`}}>
      <Box borderWidth="1px" width="267px" height="168px" borderRadius="8px" overflow="hidden">
        <Image src={imageUrl} alt='' />
        <Box display="flex" position="relative" bottom="120px" ml="10px">
          <Box py="6px" px="12px" color={colors.neutral_600} backgroundColor="white" borderRadius="24px">
            <Text fontWeight="400" fontSize="12px" lineHeight="14px">{daysLeft} days left</Text>
          </Box>
        </Box>
      </Box>
      

      {/* Profile */}
      <Box mt="24px" display="flex">
        <Box borderWidth="1px" width="28px" height="28px" borderRadius="28px" overflow="hidden">
          <Image src={"https://static.scrum.org/web/images/profile-placeholder.png"} alt='' />
        </Box>
        <Box ml="12px" color={colors.neutral_500} fontSize="14px" mt="3px">
          {truncateWallet(walletAddress, 10)}
        </Box>
      </Box>

      {/* Funding Progress */}
      <Box mt="12px" height="8px">
        <Progress colorScheme='green' size='md' value={percentFunded} borderRadius="4px"/>
      </Box>

      {/* Progress Numbers */}
      <Box mt="18px" display="flex" justifyContent="space-between">
        <Text color={colors.neutral_400} fontSize="12px" lineHeight="14px">{`${participantsCount} persons have participated`}</Text>
      </Box>

      {/* Title */}
      <Box mt="12px">
        <Text color={colors.neutral_900} textAlign="left" fontWeight="600" lineHeight="24px" fontSize="16px">
          {title}
        </Text>
      </Box>

      {/* Description */}
      <Box mt="18px" >
        <Text color={colors.neutral_600} fontWeight="400" fontSize="14px" lineHeight="21px" textAlign="left">
          {description}
        </Text>
      </Box>
    </Link>
  )
}

export default Card;