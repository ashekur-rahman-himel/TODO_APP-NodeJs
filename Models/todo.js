const mongooes = require("mongoose");


const todoSchema = mongooes.Schema({
    text: {
        type:String,
        require: true,
    },
    date:{
        type: Date,
        default : Date.now,
    }
});

module.exports = mongooes.model('Todo', todoSchema);

