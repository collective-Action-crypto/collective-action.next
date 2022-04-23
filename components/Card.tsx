import { Box, Image, Link, Progress, Text } from '@chakra-ui/react';
import React from 'react';
import colors from '../theme/colors';
import text from '../theme/text';

const Card = ({ title, description, profile_url, profile_name, type, current_value_in_usd, total_value_in_usd }) => {
  const percentFunded = ((current_value_in_usd/total_value_in_usd)*100).toFixed(0);

  return (
    <Link width="307px" height="488px" borderWidth="1px" borderColor={colors.neutral_100} p="20px" borderRadius="24px" _hover={{borderColor: 'rgb(0,128,0,0.4)', boxShadow: `0px 50px 20px rgba(92, 92, 92, 0.01), 0px 28px 17px rgba(92, 92, 92, 0.02), 0px 12px 12px rgba(92, 92, 92, 0.04), 0px 3px 7px rgba(92, 92, 92, 0.05), 0px 0px 0px rgba(92, 92, 92, 0.05)`}}>
      <Box borderWidth="1px" width="267px" height="168px" borderRadius="8px" overflow="hidden">
        <Image src="https://www.penthousepantherclub.com/pharaoh_small.png" alt='' />
        <Box display="flex" position="relative" bottom="120px" ml="10px">
          <Box py="6px" px="12px" color={colors.neutral_600} backgroundColor="white" borderRadius="24px" mr="5px">
            <Text fontWeight="400" fontSize="12px" lineHeight="14px">{type}</Text>
          </Box>
          <Box py="6px" px="12px" color={colors.neutral_600} backgroundColor="white" borderRadius="24px">
            <Text fontWeight="400" fontSize="12px" lineHeight="14px">2 days left</Text>
          </Box>
        </Box>
      </Box>
      

      {/* Profile */}
      <Box mt="24px" display="flex">
        <Box borderWidth="1px" width="28px" height="28px" borderRadius="28px" overflow="hidden">
          <Image src={profile_url} alt='' />
        </Box>
        <Box ml="12px" color={colors.neutral_500} fontSize="14px" mt="3px">
          {profile_name}
        </Box>
      </Box>

      {/* Funding Progress */}
      <Box mt="12px" height="8px">
        <Progress colorScheme='green' size='md' value={percentFunded} borderRadius="4px"/>
      </Box>

      {/* Progress Numbers */}
      <Box mt="18px" display="flex" justifyContent="space-between">
        <Text color={colors.neutral_400} fontSize="12px" lineHeight="14px">{`$${current_value_in_usd} out of $${total_value_in_usd}`}</Text>
        <Text color={colors.neutral_500} fontSize="12px" lineHeight="14px">{`${percentFunded}% Funded`}</Text>
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