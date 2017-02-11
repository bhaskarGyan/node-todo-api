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

app.post('/todo',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc)
    },err=>{
        res.send(err);
    });
    console.log(req.body.text);

});
app.listen(3000,()=>{
   console.log('App started on port 3000');
});
