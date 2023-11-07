const express = require('express'); 
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors')

require('./Config/dbConfig');
  

const app = express(); 


//app.use(cors({
//    origin: 'http://localhost:5173/',
//    credentials: true,
//}));


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/cookie',(req,res)=>{
res.cookie("check","second");
res.status(200).send({
'msg':"its working"
})
})

const PORT = 3000; 

app.use('/user',require('./Routes/userRoutes'));
app.use('/admin',require('./Routes/adminroutes'));

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    }
);