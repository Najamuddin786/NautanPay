// SignupForm.js
import {
    Box, Flex, Text, Input, Button, useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import OtpInput from './OtpInput';
import { Link } from "react-router-dom";

function SignupForm() {
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const toast = useToast();

    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleSendOtp = () => {
        if (mobileNumber.length !== 10) {
            toast({ title: "Invalid Mobile Number", description: "Mobile number must be 10 digits.", status: "error", duration: 3000, isClosable: true, position: "top" });
            return;
        }
        setIsOtpSent(true);
        setCountdown(90);
        toast({ title: "OTP Sent", description: "An OTP has been sent to your mobile number.", status: "success", duration: 3000, isClosable: true, position: "top" });
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleSignup = () => {
        if (!name || mobileNumber.length !== 10 || password !== confirmPassword || !isStrongPassword(password) || otp.length !== 4 || couponCode.length !== 6) {
            toast({ title: "Signup Failed", description: "Please fill all fields correctly.", status: "error", duration: 3000, isClosable: true, position: "top" });
            return;
        }
        const userData = { name, mobileNumber, password, otp, couponCode };
        console.log(userData);
        toast({ title: "Signup Successful", description: "Your account has been created.", status: "success", duration: 3000, isClosable: true, position: "top" });
    };

    return (
        <Flex h="90%" w="100%"  gap={'2.4vh'} pt='3vh' justifyContent={'center'}>
            {/* Input fields for Name, Mobile Number, Password, etc. */}
            <Flex flexDir={'column'} gap={'2.4vh'} w={{base:'100%',sm:'90vw',md:'400px'}}>
            <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">
                      Enter  Name
                    </Text>
                    <Input placeholder="Enter Your Name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)} />
           
                </Box>
                <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">
                      Mobile  Number
                    </Text>
            <Flex gap="5px">
                <Input type="tel" placeholder="Phone number" aria-label="Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                <Button color="blue" onClick={handleSendOtp} isDisabled={countdown > 0}>
                    {countdown > 0 ? `Resend OTP (${countdown}s)` : "Send OTP"}
                </Button>
            </Flex>
            </Box>
            <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">
                        Set Password
                    </Text>
            <Input placeholder="Set Password" aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">
                        Confirm Password
                    </Text>
            <Input placeholder="Confirm Password" aria-label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Box>
                   
            <Box position="relative">
                    <Text zIndex="10" bg="white" mx="15px" mt="-14px" position="absolute" top="0px">
                        Coupon Code
                    </Text>
            <Input placeholder="Coupon Code" aria-label="Coupon Code" maxLength={6} value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            </Box>
            <OtpInput otp={otp} setOtp={setOtp} />
            <Button py='10px' colorScheme="green" onClick={handleSignup}>Signup</Button>
            <Flex justifyContent={'center'} fontSize={'14px'} mt='-1vh'>Already have an account? <Link to='/login'><Text color={'blue'}>Login</Text></Link></Flex>
            </Flex>
        </Flex>
    );
}

export default SignupForm;
