import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
  IconButton,
  Stack,
  Box,
  Tag,
  TagLabel,
  HStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { MdBookmarkBorder, MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useNotesStore } from '../store/NotesStore';
import { useNavigate } from 'react-router-dom';

const MotionCard = motion(Card);

const NoteTile = ({ note}) => {
  const navigate = useNavigate();
  const { deleteNote, bookmarkNote} = useNotesStore();
  const toast = useToast();

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      toast({
        title: 'Note deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting note.',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBookmark = async (noteId)=> {
    try {
      await bookmarkNote(noteId) 
      toast({
        title: `Note ${note.bookmarked ? "unbookmarked" : "bookmarked"}`,
        status: `${note.bookmarked ? "info" : "success"}`,
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error bookmarking note.',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const updatedAtDate = new Date(note.updatedAt).toLocaleString();

  return (
    <MotionCard
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      w="300px"
      h="360px"
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.3s ease-in-out"
      cursor="pointer"
      onClick={() => navigate(`/update-note/${note._id}`)}
    >
      <CardHeader pb={1}>
        <Flex justify="space-between" align="start">
          <Box maxW="200px">
            <Heading size="md" isTruncated>
              {note.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {updatedAtDate}
            </Text>
          </Box>

          <HStack>
            <IconButton
              variant={note.bookmarked? "solid" :'outline'}
              size="sm"
              colorScheme={note.bookmarked? "green" :'gray'}
              icon={<MdBookmarkBorder />}
              aria-label="Bookmark"
              className='bookmarkBtn'
              onClick={(e) => {
                e.stopPropagation();
                handleBookmark(note._id)
              }
            }
            />
            <IconButton
              variant="solid"
              size="sm"
              colorScheme="red"
              icon={<MdDelete />}
              aria-label="Delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(note._id);
              }}
            />
          </HStack>
        </Flex>
      </CardHeader>

      <CardBody pt={2} px={4}>
        <Text
          fontSize="md"
          whiteSpace="pre-wrap"
          noOfLines={6}
          color="gray.700"
        >
          {note.content}
        </Text>
      </CardBody>

      <CardFooter px={4} pt={0}>
        <HStack spacing={2} wrap="wrap">
          {note.tags.map((tag, index) => (
            <Tag
              size="md"
              colorScheme="teal"
              borderRadius="full"
              key={index}
              maxW="100px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              <TagLabel># {tag}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </CardFooter>
    </MotionCard>
  );
};

export default NoteTile;
