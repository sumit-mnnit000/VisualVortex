const Account = require("../../models/account");
const User = require("../../models/user");

exports.profile=async(req,res)=>{
    try{
        const token = req.header('Authorization');
        const user=await User.findOne({ token })
        const account=await Account.findOne({user_id:user._id})
        console.log("user",user,"account",account)
        res.status(200).json({
            success:true,
            status:200,
            message:"user data found suceefully",
            data:{
                username:user.username,
                account:account
            }
    })
    }catch(error){

        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
       
}