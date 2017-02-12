/**
 * Created by bhaskar on 09/02/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
let {mongoose} = require('./db/mongoose');
let {ObjectId} = require('mongodb');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const port = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   let todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    todo.save().then((doc) => {
        res.send(doc)
    }, err => {
        res.status(400).send(err);
    });

});
app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({todos});
    }, e => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) =>{
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});

    }).catch(e => res.status(400).send(e));

});

app.delete('/todos/:id',(req,res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            res.status(404).send();
        }

        res.send({todo});
    }).catch(e => res.status(400).send(e));
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = {app};