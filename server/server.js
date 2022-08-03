require('dotenv').config();
const express = require("express")
const app = express()
const router = require("./routes/router")
const Cors = require("cors")

app.use(express.urlencoded({ extended: false }));
app.use(Cors())
app.use(express.json()); 

app.use("/", router)

const Port = process.env.PORT || 6500
app.listen(Port,()=>console.log(`server is running on Port ${Port}` ))