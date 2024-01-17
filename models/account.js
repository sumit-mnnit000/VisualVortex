const mongoose = require("mongoose")

const AccountSchema= new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    first_name:{
        type:String,
        max:50,
        default:"",

    },
    last_name:{
        type:String,
        max:50,
        default:"",

    },
    
});

module.exports= mongoose.model("Account",AccountSchema);