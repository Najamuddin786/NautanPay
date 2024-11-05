import express from "express";
import UserSignupModel from "../model/signup.model.js";
import OtpModel from "../model/otp.model.js";
import moment from "moment-timezone";

const signupRouter = express.Router();

signupRouter.post('/signup', async (req, res) => {
    const { number, name, password, coupon, otpCode } = req.body; // Assuming these fields are sent in the request

    try {
        // Step 1: Check if the user already exists
        const existingUser = await UserSignupModel.findOne({ number });
        if (existingUser) {
            return res.status(200).send("User already exists");
        }

        // Step 2: Verify the OTP
        const otpRecord = await OtpModel.findOne({ number, code: otpCode });
        if (!otpRecord) {
            return res.status(202).send("Invalid OTP or number");
        }

        // Check if the OTP has expired
        const currentTime = moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss');
        if (currentTime > otpRecord.expiresAt) {
            return res.status(202).send("OTP has expired");
        }

        // Delete the OTP after verification
        await OtpModel.deleteOne({ _id: otpRecord._id });

        // Step 3: Create the user
        const newUser = new UserSignupModel({
            name,
            number,
            password,
            coupon
        });

        await newUser.save();
        res.status(200).send("User created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the user");
    }
});

export default signupRouter;
