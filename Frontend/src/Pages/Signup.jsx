import {
    Box, Image, Flex, Text, Input, Button, HStack,
    PinInputField, PinInput, useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import imageNautanPay from '../assets/NautanPay.png';
import Up from "../Components/Login/Up";
import SignupForm from "../Components/Login/SignupForm";

export default function Signup() {
    return (
        <Box h="100vh" bg="#0be881">
            <Box p="20px" h="25vh" bg="#0be881">
                <Up />
            </Box>
            <Box p="20px" h="80vh" mt="-5vh" bg="white" borderRadius={{ base: "10vw 10vw 0px 0px", md: "5vw 5vw 0px 0px" }}>
                <SignupForm />
            </Box>
        </Box>
    );
}
