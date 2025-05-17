import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";  // eslint-disable-line no-unused-vars
import {
  Button,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';

import TagsInput from '../components/TagsInput';
import { useNotesStore } from '../store/NotesStore';
import { useUserStore } from '../store/UserStore';

const UpdateNotes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { getNote, updateNote, note, isLoading, error } = useNotesStore();
  const { user } = useUserStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getNote(id);
  }, [getNote, id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTags(note.tags || []);
    }
  }, [note]);

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateNote(title, content, tags, user, id);
      toast({
        title: 'Note updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Failed to update note',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" color="teal.500" />
      </div>
    );
  }

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
        <form className='flex flex-col gap-4' onSubmit={handleUpdateNote}>
          <Input
            variant='flushed'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fontWeight="bold"
            fontSize="xl"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Edit your note...'
            size='md'
            rows={20}
            resize='none'
          />
          <TagsInput tags={tags} setTags={setTags} placeholder="Edit tags..." />

          {error && <Text color="red.500">{error}</Text>}

          <Stack direction='row' spacing={4}>
            <Button
              colorScheme='teal'
              variant='solid'
              type='submit'
              isLoading={isSubmitting}
              disabled={!title || !content}
            >
              Save
            </Button>
            <Button type='button' onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateNotes;
