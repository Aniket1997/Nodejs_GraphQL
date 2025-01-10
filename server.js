const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.use(express.json());

connectDB();

app.listen(8000,()=>{
    console.log("Server is running on http://localhost:8000");
})