// utils/otpUtils.js
export const generateRandomOtp = (length = 4) => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10); // Generate a random digit
    }
    return otp;
};


