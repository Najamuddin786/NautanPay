import express from "express";
import OtpModel from "../model/otp.model.js";
import { generateRandomOtp } from "../utility/otpUtils.js";
import { sendSMS } from "../utility/otpApi.js";
import UserSignupModel from "../model/signup.model.js";
import moment from "moment-timezone";

const otpRouter = express.Router();

// Route to request an OTP
otpRouter.post('/send-otp', async (req, res) => {
    const { number } = req.body;

    // Step 1: Check if the user already exists
    try {
        const existingUser = await UserSignupModel.findOne({ number });
        if (existingUser) {
            return res.status(202).send("User already present"); // 409 for Conflict
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
        return res.status(500).send("An error occurred while checking user existence");
    }

    // Step 2: Generate and send OTP
    const otpCode = generateRandomOtp();

    try {
        // Send the OTP via SMS
        const smsResponse = await sendSMS(number, otpCode);
        console.log("SMS Response:", smsResponse);

        // Save the OTP to the database with an expiration time
        const otp = new OtpModel({
            code: otpCode,
            number: number,
            expiresAt: moment().tz("Asia/Kolkata").add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss') // Set expiry time for OTP
        });

        await otp.save();

        res.status(200).send("OTP sent successfully");
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send("An error occurred while sending OTP");
    }
});

export default otpRouter;
