import { Box, Flex, Icon,Text } from "@chakra-ui/react";
import { FiSmartphone, FiClock } from "react-icons/fi";
import ImageSlider from "../Components/Home/ImageSlider";
import '../App.css'
import Footer from "../Components/Footer";

function Service() {
    return (
        <Flex color='blue'  boxShadow={'xl'} fontWeight={'600'} borderRadius={'md'} gap='3' p='10px' bg='rgb(242, 245, 251)' flexDir={{base:"column",md:"row"}}>
            <Box id='myElement' margin={'auto'}><Text p='10px' borderRadius={'25px'} bg='orange' w='120px'><h1>Our Service</h1></Text></Box>
            <Box  id='myElement' borderRadius={'md'} bg='white' w='100%' py='10px' px='5px' boxShadow={'xl'} display="flex" alignItems="center" >
                <Icon as={FiSmartphone} boxSize={5} mr={2} />
                Recharge <Text color={'black'} ml='5px'> Every Recharge Earn CashBack</Text>
            </Box>
            <Box id='myElement' borderRadius={'md'} bg='white' w='100%' py='10px' px='5px' boxShadow={'xl'} display="flex" alignItems="center" >
                <Icon as={FiClock} boxSize={5} mr={2} />
                Comming Soon <Text color={'black'} ml='5px'>Earn CashBack</Text>
            </Box>
            <Box id='myElement' borderRadius={'md'} bg='white' w='100%' py='10px' px='5px' boxShadow={'xl'} display="flex" alignItems="center" >
                <Icon as={FiClock} boxSize={5} mr={2} />
                Comming Soon <Text color={'black'} ml='5px'>Earn CashBack</Text>
            </Box>
            
        </Flex>
    );
}

export default function Home() {
    return (
        <Flex gap={'5'} p='10px' bg="#0be881" height={'100vh'} flexDir={'column'}>
            <ImageSlider/>
            <Service />
            <Footer/>
        </Flex>
    );
}
