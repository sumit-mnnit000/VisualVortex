const mongoose = require("mongoose")

const OTPSchema= new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    otp:{
        type:Number,
        max:6,
    }
    


});

modeule.exports= mogoose.model("OTP",userSchema);