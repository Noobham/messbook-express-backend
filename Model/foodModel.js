const mongoose=require('mongoose');

const foodSchema = new mongoose.Schema({
    name : String,
    price : String,
    messId : {type:mongoose.Types.ObjectId}
})

const foodModel =  mongoose.model("food",foodSchema);
module.exports = foodModel;