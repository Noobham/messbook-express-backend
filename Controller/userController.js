const userModel = require("../Model/userModel");
const jwt = require('jsonwebtoken');
const { createToken } = require("../utils/isAuth");
const messModel = require("../Model/messModel");
const foodModel = require("../Model/foodModel");


exports.createUser = async (req,res)=>{
    const {userName,password,rollNo} = req.body;
    
    if(!userName || !password || !rollNo){
        return res.status(202).send({
            success:false,
            msg:"Details are missing"
        })
    }
    let user = await userModel.find({rollNo});
    if(!user) return res.status(202).send({
        success:false,
        msg:"rollNo already exist"
    })
    user = new userModel({userName,password,rollNo});
    user.save();

    const token = await createToken(user);
    if(!token) {
        console.log("token not found");
        return res.status(401).send({success:false,msg:"something went wrong"});
    }
    res.cookie("token",token);

    res.status(201).send({success:true,
        msg:"user created"
    })
};

exports.loginUser = async (req,res)=>{
    const {rollNo,password} = req.body;
    if(!password || !rollNo){
        return res.status(202).send({
            success:false,
            msg:"Details are missing"
        })
    }
    const user = await userModel.findOne({rollNo,password});
    
    if(!user) {
        return res.status(401).send({success:false,
            msg:"Please provide valid rollNo and password"});
    }

    const token =  await createToken(user);
    if(!token) {
        console.log("token not found");
        return res.status(401).send({success:false,
            msg:"something went wrong"});
    }
    res.cookie("token",token);
    res.status(200).send({
        success:true,
        user:user,
        msg:"Logged in successfully"})
}


exports.getUserDetails = (req,res)=>{
    res.status(200).send(
        {success:true,
        user:req.user}
    )
}

exports.getMessList = async (req,res)=>{
    const mess = await messModel.find({});
    res.status(200).send({
        success:true,
        mess
    })
}

exports.getFoodList = async (req,res)=>{
    const {id} = req.params;
    if(id=="undefined") return res.status(404).send({
    success:false,
    msg:"Not a valid mess"
    })
    const foodList = await foodModel.find({messId:new Object(id)});
    res.status(200).send({
        success:true,
        foodList
    })
}