import { Box,Flex,Text } from "@chakra-ui/react";
import { CiHome } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { FaMobile } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer(){
    let [active,setActive]=useState('home')

    return <>
            <Flex borderTopRadius={'xl'} alignItems={'center'} justifyContent={'space-around'} m='-10px' h='10vh' w='100vw' bg='white' position={'fixed'} bottom={'0px'}>
                    <Link >
                    <Flex color={active=='home' ? "blue" : 'black'} onClick={()=>{setActive('home')}} flexDir={'column'} alignItems={'center'}>
                        <Box  fontSize={'22px'}><CiHome /></Box>
                        <Text mt='-7px'>Home</Text>
                    </Flex>
                    </Link>
                    <Link>
                    <Flex color={'white'} p='10px'  mb='40px' fontWeight={'600'}  borderRadius={'100px'} h='85px' w='85px' border={'5px solid white'} bg='blue' flexDir={'column'} alignItems={'center'}>
                        <Box  fontSize={'22px'}><FaMobile /></Box>
                        <Text>Recharge</Text>
                    </Flex>
                    </Link>
                    <Link>
                    <Flex color={active=='history' ? "blue" : 'black'} onClick={()=>{setActive('history')}} flexDir={'column'} alignItems={'center'}>
                        <Box  fontSize={'22px'}><MdHistory /></Box>
                        <Text mt='-7px'>History</Text>
                    </Flex>
                    </Link>
                   
            </Flex>
    </>
}