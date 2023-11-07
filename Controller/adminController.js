const foodModel = require('../Model/foodModel');
const messModel = require('../Model/messModel');

exports.createMess = (req,res)=>{
    const {messName} = req.body;
    const mess = new messModel({name:messName,foodList:[]});
    mess.save();
    res.status(201).send({
        success:true
    })
}

exports.createFood = async(req,res)=>{
    const {foodName,price} = req.body;
    const {id} = req.params;
    if(id=="undefined" || !id) return res.status(404).send({
        success:false,
        msg:"Not a valid mess"
        })
    const mess = await messModel.findOne({_id:id});

    if(!mess) return res.status(402).send({
    success:false,
    msg: 'Not Valid Mess'
    })

    const food = new foodModel({name:foodName,price,messId:mess._id});
    food.save();

   await messModel.findOneAndUpdate({_id:id},{foodList:[...mess?.foodList,food.id]});

   return res.status(201).send({
        success:true,
    });
}

