import React from 'react';
import { Box, Heading, Text, Button, VStack, Icon } from '@chakra-ui/react';
import { MdNoteAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NoNotes = () => {
  const navigate = useNavigate();

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      minH="60vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={6}>
        <Icon as={MdNoteAdd} boxSize={20} color="gray.400" />
        <Heading as="h2" size="lg" color="gray.600">
          No Notes Found
        </Heading>
        <Text color="gray.500" fontSize="md" maxW="md">
          You haven't created any notes yet. Click below to start your first note!
        </Text>
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => navigate('/create-note')}
        >
          Create Note
        </Button>
      </VStack>
    </Box>
  );
};

export default NoNotes;
