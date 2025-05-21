import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { MdAddBox, MdSearch, MdMenu } from 'react-icons/md';
import React from 'react';
import { useUserStore } from '../store/UserStore';
import {Link, useNavigate} from "react-router-dom"

const Nav = ({searchVal, handleSearchNote}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {user, logout} = useUserStore();

  const navigate = useNavigate();

  const handleLogout = async ()=> {
    logout();
  }

  

  return (
    <>
      <Box
        w="100%"
        p={4}
        boxShadow="xl"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Brand */}
        <Text
          bgGradient="linear(to-r, teal.500, green.500)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="extrabold"
        >
          mYNotes
        </Text>

        {/* Desktop Search & Actions */}
        <HStack display={{ base: 'none', md: 'flex' }} spacing={6}>
          <InputGroup maxW="250px">
            <InputLeftElement pointerEvents="none">
              <MdSearch />
            </InputLeftElement>
            <Input type="text" placeholder="Search Notes" value={searchVal}
            onChange={handleSearchNote} />
          </InputGroup>

          <Link to={"/create-note"} ><Button leftIcon={<MdAddBox />} colorScheme="teal">Create a Note</Button></Link>

          <Menu>
            <MenuButton as={Button} bg="transparent" _hover={{ bg: "transparent" }} _active={{ bg: "transparent" }}>
            <Avatar size="sm" name={user.username} bg="teal.500" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=> {navigate("/myprofile")}}>My Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {/* Mobile Hamburger Menu */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          icon={<MdMenu />}
          variant="ghost"
          aria-label="Open Menu"
          onClick={onOpen}
        />
      </Box>

      {/* Drawer for mobile view */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
          <VStack spacing={6} mt={10}>
  <InputGroup>
    <InputLeftElement pointerEvents="none">
      <MdSearch />
    </InputLeftElement>
    <Input type="text" placeholder="Search Notes" value={searchVal}
            onChange={handleSearchNote} />
  </InputGroup>

  <Link to={"/create-note"} ><Button leftIcon={<MdAddBox />} colorScheme="teal">Create a Note</Button></Link>

  <HStack spacing={4} align="center" w="100%">
    <Avatar bg="teal.500" size="sm" />
    <Text fontWeight="medium">Hi, {user.username}</Text>
  </HStack>

  <Button colorScheme="teal" variant="outline" w="100%" onClick={()=> {navigate("/myprofile")}}>
    My Profile
  </Button>
  <Button colorScheme="red" variant="outline" w="100%" onClick={handleLogout}>
    Logout
  </Button>
</VStack>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Nav;
