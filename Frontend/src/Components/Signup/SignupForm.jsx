// SignupForm.js
import {
    Box, Flex, Text, Input, Button, useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import OtpInput from './OtpInput';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from '../config';

function SignupForm() {
    const navigate=useNavigate()
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const toast = useToast();

    // Function to send OTP
    async function sendOTP() {
        try {
            let res=await axios.post(`${BASE_URL}/loanRiM/send-otp`, { number: mobileNumber });
            toast({
                title: res.data,
                // description: "An OTP has been sent to your mobile number.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Server Error',
              
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }

    // Function to send signup data
    async function sendData(userData) {
        try {
            let res = await axios.post(`${BASE_URL}/loanRiM/signup`, userData);
            toast({
                title: res.data,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top", // Still required for initial top positioning
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            if (res.status === 200) {
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // 1000 milliseconds = 1 second
            }
            
            
        } catch (error) {
            console.log("Getting Some Server Problem, you can try again.");
            toast({
                title: 'Server Error',
                // description: "An OTP has been sent to your mobile number.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top',
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
        }
    }

    // Password strength validator
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleSendOtp = () => {
        if (mobileNumber.length !== 10) {
            toast({
                title: "Invalid Mobile Number",
                description: "Mobile number must be 10 digits.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }
        setIsOtpSent(true);
        setCountdown(90);
        sendOTP();
        
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    // Handle Signup button click with detailed validation
    const handleSignup = () => {
        if (!name) {
            toast({
                title: "Signup Failed",
                description: "Please enter your name.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }

        if (mobileNumber.length !== 10) {
            toast({
                title: "Signup Failed",
                description: "Mobile number must be 10 digits.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }

        if (!isStrongPassword(password)) {
            toast({
                title: "Signup Failed",
                description: "Password must be strong (at least 8 characters, with uppercase, lowercase, number, and special character).",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Signup Failed",
                description: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }

        if (otp.length !== 4) {
            toast({
                title: "Signup Failed",
                description: "OTP must be 4 digits.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }

        if (couponCode.length !== 6) {
            toast({
                title: "Signup Failed",
                description: "Coupon code must be exactly 6 characters.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
                containerStyle: {
                    marginTop: "50vh", // This pushes the toast down to 50% of viewport height
                    transform: "translateY(-50%)" // Adjust to center from this position
                }
            });
            return;
        }

        const userData = {
            name,
            number: mobileNumber,
            password,
            otpCode: otp,
            coupon: couponCode
        };

        sendData(userData);

        
    };

    return (
        <Flex h="90%" w="100%" gap={'2.4vh'} pt='3vh' justifyContent={'center'}>
            <Flex flexDir={'column'} gap={'2.4vh'} w={{ base: '100%', sm: '90vw', md: '400px' }}>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Enter Name</Text>
                    <Input placeholder="Enter Your Name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Mobile Number</Text>
                    <Flex gap="5px">
                        <Input type="tel" placeholder="Phone number" aria-label="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        <Button color="blue" onClick={handleSendOtp} isDisabled={countdown > 0}>
                            {countdown > 0 ? `Resend OTP (${countdown}s)` : "Send OTP"}
                        </Button>
                    </Flex>
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Set Password</Text>
                    <Input placeholder="Set Password" aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Confirm Password</Text>
                    <Input placeholder="Confirm Password" aria-label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Coupon Code</Text>
                    <Input placeholder="Coupon Code" aria-label="Coupon Code" maxLength={6} value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                </Box>
                <OtpInput otp={otp} setOtp={setOtp} />
                <Button py='10px' colorScheme="green" onClick={handleSignup}>Signup</Button>
                <Flex justifyContent={'center'} fontSize={'14px'} mt='-1vh'>
                    Already have an account? <Link to='/login'><Text color={'blue'}>Login</Text></Link>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default SignupForm;
