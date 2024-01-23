const OTP = require("../../models/otp")
const User = require("../../models/user")
const isOTPExpired=(Otp)=>{
    if((new Date().getTime()-new Date(Otp.timestamp).getTime())/1000<=10*60){
        return true
    }else{
        return false
    }
}
exports.verify_otp=async(req,res)=>{
    try {
        const {username,otp}=req.body
        const user=await User.findOne({ username })
        console.log(user)
        let Otp=await OTP.findOne({user_id:user._id})
        if(Otp.otp===otp && isOTPExpired(Otp)){
            await User.updateOne({ is_verified: 'true' });
            return res.status(200).json({
                success: true,
                status: 200,
                message: "otp is verifed successfully",
            })
        }else{
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Invalid otp",
            })
        }
            
    
            
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            status: 500,
            error: {
                message: "Server error, Please try again later",
            }
        })
    }
    

}