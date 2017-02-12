/**
 * Created by bhaskar on 11/02/17.
 */
const {ObjectId} = require('mongodb');
const expect = require('expect');
const request = require('supertest');
const todos = [{
    _id: new ObjectId(),
    text: 'First todo test'
}, {
    _id: new ObjectId(),
    text: 'Second todo text'
}];

let {app} = require('../server');
let {Todo}  =require('../models/todo');


describe('/Post todo', () => {

    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos)
        }).then(() => done());
    });
    it('should save the data', done => {
        let text = 'Some random text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(e);
                }
                Todo.find({text}).then(result => {
                    expect(result.length).toBe(1);
                    expect(result[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            })
    });

    it('Should not create Todo with invalid body data', (done) => {
        let text = '   ';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then(doc => {
                    expect(doc.length).toBe(2);
                    done()
                }).catch(e => done(e))
            })
    });

    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2)
                })
                .end(done);
        })
    });

    describe('GET all todos with id /todo/:id', () => {
        it('should return todos with valid id', (done) => {

            request(app)
                .get(`/todos/${todos[0]._id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end(done);
        });

        it('Should return 404 if todo not found', done => {
            request(app)
                .get(`/todos/${new ObjectId()}`)
                .expect(404)
                .end(done)
        });

        it('Should return 404 for non object ids', done => {
            request(app)
                .get('/todos/4000')
                .expect(404)
                .end(done)
        });
    });
});

describe('DELETE /todo/:id',() => {
    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos)
        }).then(() => done());
    });

   it('Should delete todo from the list',(done) => {
       request(app)
           .delete(`/todos/${todos[0]._id}`)
           .expect(200)
           .expect((res) =>{
            expect(res.body.todo.text).toBe(todos[0].text)
           })
           .end(done);
   });

   it('Should return 404 if todo not found',(done) => {
            request(app)
                .delete(`/todos/${new ObjectId()}`)
                .expect(404)
                .end(done)
   });
   it('Should return 404 if object id is invalid',(done) => {
            request(app)
                .delete(`/todos/123`)
                .expect(404)
                .end(done)
   });
});