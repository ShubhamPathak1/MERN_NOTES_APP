import { MdLockOutline } from "react-icons/md";
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";


const PasswordInput = ({onchangePassword, placehold}) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  return (
    <InputGroup size='md'>
        <InputLeftElement pointerEvents='none'>
        <MdLockOutline />
            </InputLeftElement>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder={placehold}
          onChange={onchangePassword}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' bg={"transparent"} onClick={handleClick}>
            {show ? <BiHide />
 : <BiShow />}
          </Button>
        </InputRightElement>
      </InputGroup>
  )
}

export default PasswordInput