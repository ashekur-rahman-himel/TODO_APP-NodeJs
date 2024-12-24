const express = require('express');
const mongooes = require('mongoose');

//load model

const Todo = require('./Models/todo');


const app = express();

const port = 5000;

//connect with mongodb

mongooes.connect('mongodb://localhost/todolist',{useNewUrlParser:true, useUnifiedTopology: true

}).then( () => {
    console.log("Mongodb is connected");
})

//middlewares
app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false}))

app.get("/", async (req,res) => {
    const todos = await Todo.find({}).sort('-date');
    res.render("index", {todos})
})

//handle POST Request
app.post('/', async (req,res) => {
    const text = req.body.text.trim();
    if(text ==="" ){
        return res.redirect('/');
    }
    let newTodo = new Todo({
        text: req.body.text
    })
    await newTodo.save();
    res.redirect('/');

})

app.get("/:id/delete", async (req,res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

app.get("/about", (req,res) => {
    res.render("about")
})

app.listen(port, () => {
    console.log("server is live this ip ", port);
})