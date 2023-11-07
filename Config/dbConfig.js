const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:1234@cluster0.nqfulev.mongodb.net/messbook',).then(
    ()=>{
        console.log('Db connection successful');
    }
).catch((err)=>{
    console.log("err");
})