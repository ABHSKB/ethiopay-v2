const express = require("express");
require("dotenv").config();
const logger= require("./middleware/logger");
const errorHandler= require("./middleware/errorHandler");
const salaryRoutes= require("./routes/salaryRoutes");
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(logger);

app.use("/api/salary",salaryRoutes);

app.get("/",(req,res)=>{
    res.json({
        message:"EthioPay API is running"
    });
});

app.get("/api/status", (req,res)=>{
    res.status(200).json({
        status: "ok",
        app: process.env.APP_NAME,
        environment: process.env.NODE_ENV,
        time:new Date().toISOString()
    })
})

app.use((req,res)=>{
    res.status(404).json({
        error:"route not found"
    });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`${process.env.APP_NAME} running on port ${port}`);
});