/**
 * Created by bhaskar on 11/02/17.
 */
const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        minlength:1,
        trim:true,
        require:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    completedAt: {
        type: Number,
        default:null
    }
});

module.exports = {Todo};