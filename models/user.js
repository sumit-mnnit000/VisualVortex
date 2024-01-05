const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:Number,
        max:10,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    is_verified:{
        type:Boolean,
        default:false,
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
    }
    


});

module.exports= mongoose.model("User",userSchema);