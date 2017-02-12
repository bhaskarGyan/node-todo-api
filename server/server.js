/**
 * Created by bhaskar on 09/02/17.
 */
let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {ObjectId} = require('mongodb');

let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const port = process.env.PORT;
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

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.send({todo});

    }).catch(e => res.status(400).send(e));

});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }

        res.send({todo});
    }).catch(e => res.status(400).send(e));
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }
    let body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();

    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch(e => res.status.send(e))

});

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);

    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
            res.header('x-auth', token).send(user.toJSON());
    }).catch((e) => res.status(400).send(e));
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = {app};