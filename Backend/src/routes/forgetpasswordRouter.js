import express from "express";
import OtpModel from "../model/otp.model.js";
import UserSignupModel from "../model/signup.model.js";
import moment from "moment-timezone";

const forgotPasswordRouter = express.Router();

// Route for forgot password functionality
forgotPasswordRouter.post('/forgotpassword', async (req, res) => {
    const { number, otpCode, newPassword } = req.body;

            try {
                // Step 1: Check if the OTP exists for the given number and code
                    // First, find the record based only on the number
            const otpRecord = await OtpModel.findOne({ number });

            if (!otpRecord) {
                // If no record is found with the provided number
                return res.status(202).send("Invalid Number");
            }

            // If the number is found, check if the code matches
            if (otpRecord.code !== otpCode) {
                // If the code doesn't match
                return res.status(202).send("Invalid OTP");
            }

// Proceed if both the number and code are valid

        

        // Step 2: Check if the OTP is expired
        const currentTime = moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
        if (currentTime > otpRecord.expiresAt) {
            return res.status(202).send("OTP has expired");
        }

        // Step 3: Find the user and update the password
        const user = await UserSignupModel.findOne({ number });
        if (!user) {
            return res.status(202).send("User not found");
        }

        // Update the user's password
        user.password = newPassword;
        await user.save();

        // Step 4: Delete the OTP record after successful password reset
        await OtpModel.deleteOne({ _id: otpRecord._id });

        res.status(200).send("Password updated successfully");
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send("An error occurred while resetting the password");
    }
});

export default forgotPasswordRouter;
