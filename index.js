const express=require("express");
const authRouter=require('./routes/authRoutes.js')
const profileRouter = require("./routes/profileRoutes.js");
const app=express();
const port=2000;
app.listen(port,()=>{
    console.log("listening");
})
app.get("/",(req,res)=>{
    res.send("heloo how are you?");
})
app.use(express.json())
const Db=require("./config/database.js");

Db.connect();

// ...
app.use('/auth', authRouter)
app.use('/profile',profileRouter)