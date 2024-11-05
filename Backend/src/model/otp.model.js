import mongoose from "mongoose";
import moment from "moment-timezone";

// OTP schema
const otpSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => moment().tz("Asia/Kolkata").format('YYYY-MM-DD HH:mm:ss'), // Sets the time in IST
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => moment().tz("Asia/Kolkata").add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'), // Sets expiration 5 mins from creation
    },
});

// Add an index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = mongoose.model('Otp', otpSchema);

export default OtpModel;
