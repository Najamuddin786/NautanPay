import {
    Box, Flex, Text, Input, Button, useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import OtpInput from './OtpInput';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from '../config';

function SignupForm() {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(0);
    const toast = useToast();

    // Helper function to show toast
    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 3000,
            isClosable: true,
            position: "top",
            containerStyle: {
                marginTop: "50vh",
                transform: "translateY(-50%)"
            }
        });
    };

    // Function to send OTP
    const sendOTP = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/loanRiM/resendotp`, { number: mobileNumber });
            showToast(res.data, '', "success");
            setCountdown(90);
        } catch (error) {
            showToast('Server Error', '', "error");
        }
    };

    // Function to send signup data
    const sendData = async (userData) => {
        try {
            const res = await axios.post(`${BASE_URL}/loanRiM/forgotpassword`, userData);
            showToast(res.data, '', "success");
            if (res.status === 200) {
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            showToast('Server Error', '', "error");
        }
    };

    // Password strength validator
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    // Handle OTP sending with validation
    const handleSendOtp = () => {
        if (mobileNumber.length !== 10) {
            showToast("Invalid Mobile Number", "Mobile number must be 10 digits.", "error");
            return;
        }
        sendOTP();
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    // Handle Signup with detailed validation
    const handleSignup = () => {
        if (mobileNumber.length !== 10) {
            showToast("Signup Failed", "Mobile number must be 10 digits.", "error");
            return;
        }
        if (!isStrongPassword(password)) {
            showToast("Signup Failed", "Password must be strong (at least 8 characters, with uppercase, lowercase, number, and special character).", "error");
            return;
        }
        if (password !== confirmPassword) {
            showToast("Signup Failed", "Passwords do not match.", "error");
            return;
        }
        if (otp.length !== 4) {
            showToast("Signup Failed", "OTP must be 4 digits.", "error");
            return;
        }
        
        const userData = {
            number: mobileNumber,
            newPassword: password,
            otpCode: otp
        };
        sendData(userData);
    };

    return (
        <Flex h="90%" w="100%" gap="2.4vh" pt="6vh" justifyContent="center">
            <Flex flexDir="column" gap="2.4vh" w={{ base: '100%', sm: '90vw', md: '400px' }}>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Mobile Number</Text>
                    <Flex gap="5px">
                        <Input type="tel" placeholder="Phone number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        <Button color="blue" onClick={handleSendOtp} isDisabled={countdown > 0}>
                            {countdown > 0 ? `Resend OTP (${countdown}s)` : "Send OTP"}
                        </Button>
                    </Flex>
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Set New Password</Text>
                    <Input type="password" placeholder="Set New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">Confirm New Password</Text>
                    <Input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Box>
                
                <OtpInput otp={otp} setOtp={setOtp} />
                <Button py="10px" colorScheme="green" onClick={handleSignup}>Set New Password</Button>
                
            </Flex>
        </Flex>
    );
}

export default SignupForm;
