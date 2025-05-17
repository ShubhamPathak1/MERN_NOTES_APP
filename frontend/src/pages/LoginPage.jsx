import React, { useState } from 'react'
import {motion} from "framer-motion" // eslint-disable-line no-unused-vars
import { Button, Heading, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import { MdOutlineEmail } from "react-icons/md";
import PasswordInput from '../components/PasswordInput';
import { BiLogIn } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/UserStore';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, error, isLoading} = useUserStore(); 

  const handleLogin = async (e)=> {
    e.preventDefault();
    try {
      
      await login(email, password);
    } catch (error) {
      console.log(error)
    }
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
    className='rounded p-2'
>
<Heading  textAlign={'center'} m={4}>
  Welcome Back
</Heading>
    <form action="" onSubmit={handleLogin}>
        
    <VStack spacing={4}>
    <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <MdOutlineEmail />
    </InputLeftElement>
    <Input type='email' placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)} />
  </InputGroup>

    <PasswordInput placehold={"Password"} onchangePassword={(e)=>setPassword(e.target.value)}  />

    <Text className='text-green-500 hover:underline' size={"sm"}><Link to={"/forgot-password"}>Forgot Password?</Link></Text>
    {error && <Text color={'red.500'}>{error}</Text>}
    <Button leftIcon={<BiLogIn />} colorScheme='teal' variant='solid' w={"100%"} type='submit' isLoading={isLoading} isDisabled={!email || !password}>
    Login
  </Button>

    </VStack>
    </form>
    <p className='text-center pt-2'>Don't Have an Account? <span className='text-green-500 hover:underline '><Link to={"/signup"}>Sign Up</Link></span></p>
  
</motion.div>
    </div>
  )
}

export default LoginPage