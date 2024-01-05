const user=require("../models/user");
const bcrypt=require("bcrypt");
const account=require("../models/account");

exports.sign_up= async(req,res)=>{
    try {

        const{username,password,is_verified}=req.body;

        //validation

        if(!username||!password||!is_verified){
            return res.status(400).json({
                success:false,
                message:"These fields are required",
            });
        }
        if(is_verified==true){
            return res.status(400).json({
            
             success:false,
             message: "User already registered",
                
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ 
                success:false,
                message: "Username already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const Account_details = await Account.create({
            user_id:null,
            first_name:null,
            last_name:null,
        });
        const user = await User.create({
            username,
            password: hashedPassword,
            account:account._id,
           
        })
        //return res
        return res.status(200).json({
            success: true,
            message: 'User is registered Successfully',
            user,
        });
        
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }


}