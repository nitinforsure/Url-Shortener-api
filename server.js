const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./Routes/urlRoutes");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/", urlRoutes);
app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`);
});