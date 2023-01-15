const express = require("express");
const { TodoModel } = require("../models/todo.model.js");
const todoRouter = express.Router();


todoRouter.get("/", async(req, res)=>{
    const userId = req.body.userId;
    try {
        const todos = await TodoModel.find({userId});
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

todoRouter.post("/", async(req, res)=>{
    try {
        const todo = new TodoModel(req.body);
        await todo.save();
        res.json("Todo has been added");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


todoRouter.patch("/:id", async(req, res)=>{
    const id = req.params.id;
    const todo = await TodoModel.findOne({_id:id});
    const todoUid = todo.userId;
    const reqUid = req.body.userId;
    try {
        if(todoUid!=reqUid){
            res.status(401).json("You are not authorized");
        } else {
            await TodoModel.findByIdAndUpdate({_id:id}, req.body);
            res.json("Todo has been updated");
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


todoRouter.delete("/:id", async(req, res)=>{
    const id = req.params.id;
    const todo = await TodoModel.findOne({_id:id});
    const todoUid = todo.userId;
    const reqUid = req.body.userId;
    try {
        if(todoUid!=reqUid){
            res.status(401).json("You are not authorized");
        } else {
            await TodoModel.findByIdAndDelete({_id:id});
            res.json("Todo has been deleted");
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = { todoRouter }