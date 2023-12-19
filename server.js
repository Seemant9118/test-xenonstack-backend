const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');

const app = express();

// middleware setup
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

dotenv.config();

dbConnect();


const PORT = process.env.PORT || 5000;  

//middlewares
app.use(express.json());

// routes used
app.use('/api/user',userRouter);
app.use('/api/contact',contactRouter);


app.listen(PORT, ()=>{
    console.log(`Server successfully listening on ${PORT}`);
})