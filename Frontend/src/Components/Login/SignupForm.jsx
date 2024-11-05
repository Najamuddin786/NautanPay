// SignupForm.js
import {
    Box, Flex, Text, Input, Button, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from '../config';

function SignupForm() {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    // Function to send login data with validation
    async function handleLogin() {
        // Validation for required fields
        if (!mobileNumber) {
            toast({
                title: "Mobile number is required",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh",
                    transform: "translateY(-50%)"
                }
            });
            return;
        }

        if (!password) {
            toast({
                title: "Password is required",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh",
                    transform: "translateY(-50%)"
                }
            });
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/loanRiM/login`, {
                number: mobileNumber,
                password: password
            });

            if(res.status==200){
                toast({
                    title: res.data,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                    containerStyle: {
                        marginTop: "50vh",
                        transform: "translateY(-50%)"
                    }
                });
            }else{
                toast({
                    title: res.data,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                    containerStyle: {
                        marginTop: "50vh",
                        transform: "translateY(-50%)"
                    }
                });
            }

            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify({ number: mobileNumber, password }));
                setTimeout(() => {
                    navigate('/home');
                }, 1000); // Navigate after 1.5 seconds
            }
            
        } catch (error) {
            console.log("Login failed. Please try again.");
            toast({
                title: 'Login Failed',
                description: 'Incorrect mobile number or password.',
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh",
                    transform: "translateY(-50%)"
                }
            });
        }
    }

    return (
        <Flex h="55%" w="100%" gap="2.4vh" pt="8vh" justifyContent="center">
            <Flex flexDir="column" justifyContent="space-between" w={{ base: '100%', sm: '90vw', md: '400px' }}>
                
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Mobile Number</Text>
                    <Input
                        type="tel"
                        placeholder="Phone number"
                        aria-label="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </Box>
                
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Password</Text>
                    <Input
                        placeholder="Enter Password"
                        aria-label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                
                <Box textAlign="right">
                    <Link to="/forgetPassword">Forgot Password?</Link>
                </Box>

                <Button py="10px" colorScheme="green" onClick={handleLogin}>Login</Button>
                
                <Flex justifyContent="center" fontSize="14px" mt="-1vh">
                    Don't have an account? <Link to="/signup"><Text color="blue" ml="1">Sign Up</Text></Link>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignupForm;
