const User = require("../../models/user");
const Account = require("../../models/account");
const Otp = require("../../models/otp");

const isOTPExpired = (Otp) => {
    if ((new Date().getTime() - new Date(Otp.timestamp).getTime()) / 1000 <= 60) {
        return false
    } else {
        return true
    }
}

exports.resend_otp = async (req, res) => {
    try {

        const { username } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "User does not exist!"
            })
        }
        const account = await Account.findOne({ user_id: user._id })

        if (!account) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Account not found'
            });
        }
        let existingOTP = await Otp.findOne({ user_id: user._id });
        existingOTP.otp = Math.floor(100000 + Math.random() * 900000).toString();
        existingOTP.timestamp = new Date();
        await existingOTP.save();
       
        return res.status(200).json({
            success: true,
            status: 200,
            message: "OTP sent successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            error: {
                message: "Server error, Please try again later",
            }
        })

    }
}