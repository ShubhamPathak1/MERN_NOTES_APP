
import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import NoteTile from '../components/NoteTile';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useNotesStore } from '../store/NotesStore';
import { useUserStore } from '../store/UserStore';
import NoNotes from '../components/NoNotes';
import LoadingSpinner from '../components/LoadingSpinner';
import { useState } from 'react';

const DashboardPage = () => {
  const { notes, getNotes, error, isLoading } = useNotesStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?._id) {
      getNotes(user._id);
    }
  }, [user._id, getNotes]);

  
  const [searchVal, setSearchVal] = useState("");
  
  const handleSearchNote = (e)=> {
    setSearchVal(e.target.value.toLowerCase())
  }
  return (

    <>
      <Nav searchVal={searchVal} handleSearchNote={handleSearchNote} setSearchVal={setSearchVal} />
      <Container maxW="container.xl" py={6}>
        {/* Loading state */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <Text color="red.500">Error Fetching your Notes</Text>
        ) : notes.length === 0 ? (
          <NoNotes />
        ) : (
          <SimpleGrid
          justifyItems="center" 
            columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
            spacing={6}
          >
            {notes.filter((note)=>
            (note.title.toLowerCase().includes(searchVal)||
            note.tags.some(tag=> tag.toLowerCase().includes(searchVal))||
            note.content.toLowerCase().includes(searchVal))).map((note) => (
              <NoteTile key={note._id} note={note}  />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default DashboardPage;
