const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
    name:String,
    foodList:[mongoose.Types.ObjectId]
})

const messModel = mongoose.model('mess',messSchema);
module.exports = messModel;
