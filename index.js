const express=require("express")
const mongoose=require("mongoose")
const user=require("./controller/user")
const bodyParser = require("body-parser");
const cors = require("cors")
const app=express()
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://test:12345@cluster0.nv0rd2v.mongodb.net/Quiz")
var db=mongoose.connection
db.on("open",()=>{console.log("DB is connected")})
db.on("error",()=>{console.log("DB is not connected")})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use("/user",user)
app.listen(4000,()=>{
    console.log("Server is Started 4000!!")
})