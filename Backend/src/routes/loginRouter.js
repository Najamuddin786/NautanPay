// Import necessary dependencies
import express from "express";
import UserSignupModel from "../model/signup.model.js";
import moment from "moment-timezone";

const loginRouter = express.Router();

// Login route
loginRouter.post('/login', async (req, res) => {
    const { number, password } = req.body; // Assuming these fields are sent in the request

    try {
        // Step 1: Find the user by their mobile number
        const user = await UserSignupModel.findOne({ number });
        
        // Check if user exists
        if (!user) {
            return res.status(202).send("User not found");
        }

        // Step 2: Verify if the password matches
        if (user.password !== password) {
            return res.status(202).send("Incorrect password");
        }

        // Step 3: If login is successful, you can send additional data if needed
        res.status(200).send("Login successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during login");
    }
});

export default loginRouter;
