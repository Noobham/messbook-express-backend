const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    userName : String,
    password : String,
    rollNo : Number,
    role : {type:String,default:'user'},
    
})

const userModel =  mongoose.model("user",userSchema);
module.exports = userModel;