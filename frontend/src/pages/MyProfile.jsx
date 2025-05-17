import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Avatar,
  VStack,
  HStack,
  Button,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useUserStore } from '../store/UserStore';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  if (!user) return <Text>Loading...</Text>;

  return (
    <Container maxW="lg" py={10}>
      <Box
        bg={bg}
        borderRadius="xl"
        boxShadow="lg"
        p={8}
        border="1px solid"
        borderColor={borderColor}
      >
        <VStack spacing={6} align="center">
          <Avatar name={user.username} size="2xl" />
          <Box textAlign="center">
            <Heading size="md">{user.username.toUpperCase()}</Heading>
            <Text color="gray.500">{user.email}</Text>
          </Box>

          <Divider />

          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
            {/* You can add more actions like logout, edit, etc. */}
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default MyProfile;
