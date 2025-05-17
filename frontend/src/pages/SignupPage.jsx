import React, { useState } from 'react'
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Button, Heading, Input, InputGroup, InputLeftElement, VStack, Text } from '@chakra-ui/react'
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import PasswordInput from '../components/PasswordInput';
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';

import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordChecklist from "react-password-checklist"
import { useUserStore } from '../store/UserStore';


const SignupPage = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const navigate = useNavigate();

  const {signup, isLoading, error} = useUserStore();


  const handlePasswordChecklistChange = (isValid)=> {
    setIsPasswordValid(isValid);
  }
  

  const handleSignup = async (e)=> {
    e.preventDefault();
    try {
      
      await signup(email, password, username)
      navigate("/verify-otp");
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
    className='rounded p-6'
><Heading  textAlign={'center'} m={4}>
  Create an Account
</Heading>
    <form action="" onSubmit={handleSignup}>
        
    <VStack spacing={4}>
        
    <InputGroup>
    <InputLeftElement pointerEvents='none'>
    <FaRegUser />
    </InputLeftElement>
    <Input type='text' placeholder='Username' onChange={e=>setUsername(e.target.value)}  />
  </InputGroup>

    <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <MdOutlineEmail />
    </InputLeftElement>
    <Input type='email' placeholder='Email Address' onChange={e=>setEmail(e.target.value)} />
  </InputGroup>

    <PasswordInput onchangePassword={e => setPassword(e.target.value)} placehold={"Password"} />

      <PasswordInput onchangePassword={e => setPasswordAgain(e.target.value)} placehold={"Confirm Password"} />
        <PasswordStrengthBar className='w-full' password={password} />

    <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={password}
        valueAgain={passwordAgain}
        messages={{
					minLength: "Password has 8 characters",
					specialChar: "Password has a special character",
					number: "Password has a number",
					capital: "Password has a capital letter",
					match: "Passwords match",
				}}
				onChange={(isValid) => {handlePasswordChecklistChange(isValid)}
      }
			/>

{error && <Text color="red.500">{error}</Text>}

    <Button leftIcon={<BiLogIn />} colorScheme='teal' variant='solid' w={"100%"} type='submit' isDisabled={!isPasswordValid || !username || !email || !password || !passwordAgain} isLoading={isLoading}>
    Sign Up
  </Button>
    </VStack>
    </form>
    <p className='text-center pt-2'>Already Have an Account? <span className='text-green-500 hover:underline '><Link to={"/login"}>Login</Link></span></p>
  
</motion.div>
    </div>
  )
}

export default SignupPage