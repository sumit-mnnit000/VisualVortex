const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require("bcrypt");
require("dotenv").config()
const isValidPassword=async(password,enc_password)=>{
    let flag=await bcrypt.compare(password,enc_password)
    return flag
}  

const getToken=(user)=>{
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
    return token    

}
exports.login=async(req,res)=>{
    const {username,password}=req.body
    if(!username || !password){       
        return res.status(400).json({
            success: false,
            status: 400,
            error: {
                message: `Please enter{ ${!username ? 'username' : 'password'}`,
            }

        })
    }

    const user = await User.findOne({ username });
    if(!user){
        res.status(404).json({
            success:false,
            status:404,
            error:{
                message:`Incorrect credential`
            }
        })
    }else{
        if(await isValidPassword(password,user.password)){
            user.token=getToken(user)
            await user.save()
            res.status(200).json({
                success:true,
                status:200,
                message:"user login suceefully",
                data:{user}
            })
        }else{
            res.status(404).json({
                success:false,
                status:404,
                error:{
                    message:`Incorrect credential`
                }
            })  
        }
        
    }
       
}