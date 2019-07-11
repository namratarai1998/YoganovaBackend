const chai = require('chai');
const chaiHttp = require('chai-http');
var should = chai.should();
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const server = require("../index");
// console.log(server)
var serverRun;
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

before(done => {
    serverRun = server.listen(2000, done);
});

after(done => {
    serverRun.close(done);
});




describe('Users', function () {
    describe('post user Register', function () {
        it('it should register the user', function (done) {
            chai.request(server)
                .post('/user')
                .send({
                    "fname":"Namrata",
                    "lname": "Rai",
                    "username": "namr",
                    "usertype": 'user',
                    "emailid": "namrata@gmail.com",
                    "password": "1234",
                    "gender": "male",
                    "address": "address",
                    "contactno": "98432423432"   
                })
                .end(function (err, res) {
                    // res.should.have.status(200)
                });
            done()
        })
    })
})


describe('PUT user', function () {
    uid = 11;
    it('it should edit the user with new values', function (done) {
        chai.request(server)
            .put('/user/update/' + uid)
            .send({
                'username': 'testusername'
            })
            .end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('message');
                done();
            })
    })


});

describe('delete user', function () {
    uid = 10;
    it('it should delete the user with new values', function (done) {
        chai.request(server)
            .delete('/user/delete/' + uid)
            .end(function (err, res) {
                res.should.have.status(201);
                res.body.should.have.property('message');
                done();
            })
    })


});


