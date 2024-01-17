const User=require("../../models/user");
const bcrypt=require("bcrypt");
const account=require("../../models/account");

exports.sign_up= async(req,res)=>{
    try {
        const{username,password}=req.body;
        
        //validation

        if(!username || !password){
            return res.status(400).json({
                success:false,
                status:400,
                error:{
                    message:`Please enter ${!username?'username':'password'}`,
                }
                
            })
        }

        if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*_?&]{8,}$/).test(password)){
            return res.status(400).json({ 
                success:false,
                status:400,
                error:{
                    message: "Your password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character",
                }
                
            });
        }
        

        const existingUser = await User.findOne({ username });
        console.log("existing user",existingUser)
        if (existingUser) {
            if(existingUser.is_verified){
                return res.status(409).json({ 
                    success:false,
                    status:409,
                    error:{
                        message: "User already exists",
                    }
                    
                });
            }else{
                //call send otp function
            }
            
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
        })
        console.log("user created",user)
        const Account_details = await account.create({
            user_id:user?.id,
        });
        //return res
        return res.status(200).json({
            success: true,
            message: 'User is registered Successfully',
            user,
        });
        
    }
    catch (error) {
        console.log("error",error)
        if(error.name==='ValidationError'){
            if(error.errors['username']){
                return res.status(400).json({
                    success:false,
                    status:400,
                    error:{
                        message:`Please enter valid username`,
                    }
                })
            }
            if(error.errors['password']){
                return res.status(400).json({
                    success:false,
                    status:400,
                    error:{
                        message:`Please enter valid password`,
                    }
                })
            }
            
        }else{
            return res.status(500).json({
            success: false,
            status:500,
            error:{
                message: "User cannot be registrered. Please try again",
            }
        })
        }
        
    }


}