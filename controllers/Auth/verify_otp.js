const OTP = require("../../models/otp")
const User = require("../../models/user")
const jwt = require('jsonwebtoken');
const isOTPExpired=(Otp)=>{
    if((new Date().getTime()-(new Date(Otp.timestamp).getTime())/1000)>=10*60){
        return false
    }else{
        return true
    }
}
const getToken=(user)=>{
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
    return token    

}
exports.verify_otp=async(req,res)=>{
    try {
        const {username,otp}=req.body
        const user=await User.findOne({ username })
        let Otp=await OTP.findOne({user_id:user._id})
        if(Otp.otp===otp && !isOTPExpired(Otp)){
            let token=getToken(user)
            user.is_verified=true
            user.token=token
            await user.save()            
            res.status(200).json({
                success:true,
                status:200,
                message:"otp is verifed successfully",
                data:{user}
            })
        }else{
            if(isOTPExpired(Otp)){
                return res.status(401).json({
                    success: false,
                    status: 401,
                    message: "Otp is expired",
                })
            }else{
                return res.status(401).json({
                    success: false,
                    status: 401,
                    message: "Invalid otp",
                })
            }
            
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            error: {
                message: "Server error, Please try again later",
            }
        })
    }
    

}