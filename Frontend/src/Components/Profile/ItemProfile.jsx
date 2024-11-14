import React from 'react';
import { Box,Flex, Avatar, Heading, Text, Stack, Button, Divider, Input } from '@chakra-ui/react';
import human from './human.png'

const ItemProfile = () => {
  let user=JSON.parse(localStorage.getItem('user'))
  return (
    <Box
      maxW="500px"
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      textAlign="center"
      mx="auto"
      mb='10vh'
    >
      <Avatar
        size="xl"
        src={human} // Replace with the user's profile picture URL
        alt="Profile Picture"
        mb={4}
        pos="relative"
      />
      
      <Heading fontSize="2xl" mb={2}>
        {user?.name}
      </Heading>
      
      <Stack spacing={4} mt={4} align="center">
        <Box w="full">
          <Text fontWeight="bold" mb={1}>Mobile Number</Text>
          <Input
            variant="filled"
            value={user?.number}
            isReadOnly
            bg="gray.100"
          />
        </Box>
        
        <Box w="full">
          <Text fontWeight="bold" mb={1}>Password</Text>
          <Input
            variant="filled"
            placeholder="********"
            isReadOnly
            bg="gray.100"
            type="password"
          />
        </Box>
      </Stack>

      <Divider my={1} />

      

      <Flex flexDir={'column'}>
      <Button
        mt={6}
        colorScheme="teal"
        variant="solid"
        borderRadius="full"
      >
        Recharge History
      </Button>
      <Button
        mt={6}
        colorScheme="teal"
        variant="solid"
        borderRadius="full"
      >
        Coming Soon
      </Button>
      <Button
        mt={6}
        colorScheme="teal"
        variant="solid"
        borderRadius="full"
      >
        Coming Soon
      </Button>
      </Flex>
    </Box>
  );
};

export default ItemProfile;
