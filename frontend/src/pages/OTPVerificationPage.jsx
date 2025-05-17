import { Button, Heading, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { motion } from "framer-motion" // eslint-disable-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/UserStore';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");

  const { error, isLoading, verifyEmail} = useUserStore();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(otp);     
      navigate('/');          
    } catch (err) {
      console.error("OTP verification failed", err);
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
        className='rounded p-6 flex items-center flex-col gap-4'
      >
        <Heading textAlign={'center'} m={4}>Verify OTP</Heading>

        <form onSubmit={handleVerify} className='flex flex-col gap-5 items-center'>
          <HStack>
            <PinInput size='lg' otp value={otp} onChange={setOtp}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>

          {error && <Text color="red.500">{error}</Text>}

          <Button
            colorScheme='teal'
            variant='solid'
            w={"100%"}
            type='submit'
            isDisabled={otp.length !== 6 || isLoading}
            isLoading={isLoading}
          >
            Submit OTP
          </Button>
        </form>

        <Text className='text-green-500 hover:underline' size={"sm"}>
          <Link to={"/resend-otp"}>Resend OTP</Link>
        </Text>
      </motion.div>
    </div>
  );
};

export default OTPVerificationPage;
