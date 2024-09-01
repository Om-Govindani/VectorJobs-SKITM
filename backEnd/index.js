const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
const freelancer = require("./models/freelancer"); 
const client = require("./models/client");
const free = require('./routes/freelancer.js')
const cli = require('./routes/client.js')
const job = require('./routes/jobs.js')

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.listen(8080,()=>{
    console.log("Server is listeing on port 8080");
});

//Loading the router modules
app.use('/freelancer',free)
app.use('/client',cli)
app.use('/job',job)



  