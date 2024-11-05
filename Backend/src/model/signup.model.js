import mongoose from "mongoose";

// Function to get current time in IST
function getISTTime() {
    const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours 30 minutes)
    const now = new Date();
    return new Date(now.getTime() + offsetIST);
}

// Model schema
const userSignupSchema = new mongoose.Schema({
    name: String,
    number: Number,
    password: String,
    coupon: String,
    kyc: {
        aadharCard: String,
        panCard: String,
        location: String,
        otherDoc: String,
    },
    createdAt: {
        type: Date,
        default: getISTTime, // Sets the current date and time in IST
    },
});

const UserSignupModel = mongoose.model('User', userSignupSchema);

export default UserSignupModel;
