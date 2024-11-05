// otpService.js
import axios from 'axios';

export const sendSMS = async (number, otpCode) => {
    try {
        const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", null, {
            headers: {
                "authorization": "nkyLNtPlXbRFCr4suzh6KUIAaVm9qHxDZed8T1YOfcE3o7SGjBy42d6VhZcablJsqYED5tGAOPFUk9wi" // Replace with your actual Fast2SMS API key
            },
            params: {
                "message": `Your OTP is: ${otpCode}`,
                "variables_values": otpCode,
                "route": "otp",
                "numbers": number,
            },
        });
        console.log("OTP sent successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new Error("Failed to send OTP. Please try again.");
    }
};
