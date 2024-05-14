const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const mongoDB = require('./db');

app.use(cors());
app.use(express.json());

// CORS configuration
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://khaayo.netlify.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept" 
    );
    next();
});

// Connect to MongoDB
mongoDB();

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req,res)=>{
    res.send('Hello World!');
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
