const mongoose = require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        validate: {
            validator: function(v) {
              return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
        maxLength:10,
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
    token:{
        type:String,
        default:null
    }
});

module.exports= mongoose.model("User",userSchema);