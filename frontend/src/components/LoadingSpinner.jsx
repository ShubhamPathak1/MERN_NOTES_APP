import React from 'react'
import { Spinner } from '@chakra-ui/react'

const LoadingSpinner = () => {
  return (
    <div className='w-full h-full flex justify-center mt-10'><Spinner
    thickness='4px'
    speed='0.4s'
    emptyColor='gray.200'
    color='teal.500'
    size='xl'
  /></div>
  )
}

export default LoadingSpinner