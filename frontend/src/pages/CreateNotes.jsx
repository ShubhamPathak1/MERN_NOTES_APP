


import React, { useState } from 'react';
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import TagsInput from '../components/TagsInput';
import { useUserStore } from '../store/UserStore';
import { useNavigate } from 'react-router-dom';
import { useNotesStore } from '../store/NotesStore';

const CreateNotes = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  const { user } = useUserStore();
  const { isLoading, error, createNote } = useNotesStore();

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      await createNote(title, content, tags, user._id);
      toast({
        title: 'Note created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Failed to create note.',
        description: error.message || 'Something went wrong.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen min-w-screen'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className='rounded p-6 w-full max-w-3xl'
      >
        <form className='flex flex-col gap-4' onSubmit={handleCreateNote}>
          <Input
            variant='flushed'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fontWeight={'bold'}
            fontSize={'xl'}
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Start writing your note...'
            size='md'
            rows={20}
            resize={'none'}
          />
          <TagsInput tags={tags} setTags={setTags} />

          {error && <Text color="red.500">{error}</Text>}

          <Stack direction='row' spacing={4}>
            <Button
              colorScheme='teal'
              variant='solid'
              disabled={!title || !content}
              type='submit'
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button type='button' onClick={() => navigate('/')}>
              Cancel
            </Button>
          </Stack>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateNotes;
