const express=require('express');
const { connect } = require('./config/db');
const { userRouter } = require('./routes/userroute');
const { blogRouter } = require('./routes/blogroute');
const { authenticate } = require('./middleware/authenticate');
const cookieParser = require('cookie-parser');
const app=express();
require('dotenv').config();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome to Homepage');
})

app.use(cookieParser);
app.use('/user',userRouter);
app.use(authenticate);
app.use('/blog',blogRouter);

app.listen(process.env.Port, async()=>{
    try {
        await connect;
        console.log('Connnected to Database');
    } catch (err) {
        console.log(err.message);
    }
    console.log(`Server is running at Port ${process.env.Port}`);
})
