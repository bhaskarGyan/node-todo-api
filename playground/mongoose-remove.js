/**
 * Created by bhaskar on 12/02/17.
 */
const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');

const {Todo} = require('../server/models/todo');

Todo.remove({}).then((results) => {
   console.log(results)
});