import { Box,Flex,Spacer,Text } from "@chakra-ui/react";
import { CiHome } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { FaMobile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar(){
    let [active,setActive]=useState('home')

    return <>
            <Flex borderBottom={'2px solid white'}  m='-10px' alignItems={'center'}   h='8vh' w='100vw' bg='black' position={'sticky'} top='0px' bottom={'0px'}>
               <Flex p='8px' gap={1} alignItems={'center'} color={'white'} w='100vw'>
                
                <Text fontWeight={600} fontSize={'30px'}>NivaPay</Text>
                <Spacer/>
                <Text>{"Md Najamuddin"}</Text>
                <Box border={'1px solid red'} borderRadius={'50px'} bg='blue' p='5px' fontSize={'25px'}><FaRegUserCircle /></Box>
                
                </Flex>     
                   
            </Flex>
    </>
}