// OtpInput.js
import { HStack, PinInput, PinInputField, Box, Text } from "@chakra-ui/react";

function OtpInput({ otp, setOtp }) {
    return (
        <Box mt="1vh" border="1px solid gray" borderRadius="md" py="5px" px="6%">
            <Text w="100px" px="5px" mt="-3vh" bg="white">Submit OTP</Text>
            <HStack bg="white" justifyContent="space-between" py="5px">
                <PinInput manageFocus value={otp} onChange={(value) => setOtp(value)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
        </Box>
    );
}

export default OtpInput;
