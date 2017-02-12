/**
 * Created by bhaskar on 09/02/17.
 */

const express = require('express');
const bodyParser = require('body-parser');
let {mongoose} = require('./db/mongoose');

let {Todo} = require('./models/todo');
let {User} = require('./models/user');


let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log('Bhaskar   ');
    console.log(req.body.text);
    let todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    todo.save().then((doc) => {
        res.send(doc)
    }, err => {
        res.status(400).send(err);
    });
    console.log(req.body.text);

});
app.listen(3000, () => {
    console.log('App started on port 3000');
});

module.exports = {app};