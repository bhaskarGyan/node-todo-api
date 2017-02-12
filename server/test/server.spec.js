/**
 * Created by bhaskar on 11/02/17.
 */
const expect = require('expect');
const request = require('supertest');

let {app} = require('../server');
let {Todo}  =require('../models/todo');


describe('/Post todo', () => {

    beforeEach((done) => {
        Todo.remove({}).then(() => {
            done();
        });
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
                Todo.find().then(result => {
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
                    expect(doc.length).toBe(0);
                    done()
                }).catch(e => done(e))
            })
    });
});