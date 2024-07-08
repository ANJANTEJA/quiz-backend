const express=require("express");
const { default: mongoose } = require("mongoose");
const userSchema=require("../model/userSchema")
const user=express.Router();
user.post("/create-user",(req,res)=>{
    userSchema.create(req.body,
    (err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})
user.post("/login",(req,res)=>{
    const {email,password}=req.body;
    userSchema.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                const data={result:"SUCCESS",id:user._id}
                res.json(data)
            }
            else{
                res.json("THE PASSWORD IS INCORRECT")
            }
        }
        
        else{
            res.json("USER NOT EXIST")
        }
    })
})
user.get("/",(req,res)=>{
    userSchema.find((err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
    
})
user.route("/update-marks/:id")
.get((req,res)=>{
    userSchema.find(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})
.put((req,res)=>{
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})
user.delete("/delete-student/:id",(req,res)=>{
    userSchema.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})
module.exports=user;
