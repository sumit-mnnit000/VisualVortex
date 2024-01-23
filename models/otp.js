const mongoose = require("mongoose")

const OTPSchema= new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    otp:{
        type:String,
        maxLength:6,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
    


});

module.exports= mongoose.model("OTP",OTPSchema);