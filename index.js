const express=require("express");
const app=express();
const port=2000;
app.listen(port,()=>{
    console.log("listening");
})
app.get("/",(req,res)=>{
    res.send("heloo how are you?");
})
const Db=require("./config/database.js");
Db.connect();
