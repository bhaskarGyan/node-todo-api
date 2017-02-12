/**
 * Created by bhaskar on 12/02/17.
 */
const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');

const {Todo} = require('../server/models/todo');
//console.log(Todo);
let id = '589ff23aa1d7cd078cde2929';

if(!ObjectId.isValid(id)){
    return console.log('Object ID not valid');
}
Todo.find({
    _id:id
}).then((todo) => {
    console.log(todo)
});

Todo.findOne({
    completed:false
}).then((document)=>{
    console.log(document);
}).catch(w => console.log(e));