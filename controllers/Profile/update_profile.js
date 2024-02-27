const Account = require("../../models/account");
const User = require("../../models/user");

exports.update_profile=async(req,res)=>{
    try{
        const token = req.header('Authorization');
        let user=await User.findOne({ token })
        let account=await Account.findOne({user_id:user._id})
        const {first_name,last_name}=req.body
        console.log(first_name,last_name)
        if(first_name){
            account.first_name=first_name
        }
        if(last_name){
            account.last_name=last_name
        }
        
        await account.save()
        res.status(200).json({
            success:true,
            status:200,
            message:"user profile is updated successfully",
            data:{account}
        })
    }catch(error){
        console.log("error",error)
    }    
}