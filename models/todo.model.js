const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:String,
    completed: Boolean,
    category: String,
    userId: String
});

const TodoModel = mongoose.model("todo", todoSchema);


module.exports = { TodoModel };