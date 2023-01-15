const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const {json} = require("express");
const app = express();
const cors = require("cors");
const {connection} = require('./configs/mongoose.connection.js');
const {userRouter} = require("./routes/user.route.js");
const {authenticator} = require("./middlewares/authenticator.js");
const {todoRouter} = require("./routes/todo.route.js");

//Middlewares
app.use(cors({origin:"*"}));
app.use(json());
app.use("/todos", authenticator);

//routes
app.use("/user", userRouter);
app.use("/todos", todoRouter);

//Home Page
app.get("/", (req, res)=>{
    res.json("Full Stack Todo App")
});

//Invalid End Points
app.get("*", (req, res)=>{
    res.status(404).json({message:"Invalid End Point"})
})


app.listen(process.env.port, async()=>{
    console.log(`Server is running at http://localhost:${process.env.port}`);
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to Database.");
    }
})
