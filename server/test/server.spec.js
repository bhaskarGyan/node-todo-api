/**
 * Created by bhaskar on 11/02/17.
 */
const expect = require('expect');
const request = require('supertest');
const todos = [{
    text: 'First todo test'
}, {
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
});