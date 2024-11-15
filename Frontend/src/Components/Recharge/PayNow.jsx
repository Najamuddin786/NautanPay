import { Box,Text,Flex } from "@chakra-ui/react";

export default function PayNow(){

    return <>
            <Flex alignItems={'center'} gap={2} fontWeight={600} justifyContent={'center'} p='2' boxShadow={'2xl'} color={'white'} bg='black' mt='20px'>
                <Text > Pay Now </Text>
                <Text >Using</Text>
                <Text px='10px' py='4px' borderRadius={'md'} bg='white' border={'2px solid white'} color={'green'}>UPI Click Here</Text>

            </Flex>
    </>
}