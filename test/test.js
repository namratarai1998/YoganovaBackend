const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const chailike = require('chai-like')
const chaithings = require('chai-things')

const app = require('../index');
// console.log(server)
var serverRun;
chai.use(chaiHttp)
chai.use(chailike)
chai.use(chaithings)

before(done => {
    serverRun = server.listen(2009, done);
});

after(done => {
    serverRun.close(done);
});

describe('Course',function(){
    describe('Post Insert',()=>{
        it('It should add a new course',(done)=>{
            chai
            .request(app)
            .post('/course')
            .send({
                'coursename':'hello123',
                'coursedesc':'hello'
            })
            .end((err,res)=>{
                res.should.have.status(201)
            })
            done()
        })
    })
})

    describe('Post Login',()=>{
        it('User should logged in as correct credentials are provided',(done)=>{
            chai
            .request(app)
            .post('/user/login')
            .send({
                'username':'leon',
                'password':'1'
            })
            .end((err,res)=>{
                res.should.have.status(202)
            })
            done()
        })
    })

    describe('Get User Details',()=>{
        it('Details of user is send by server with the status code 200',(done)=>{
            chai
            .request(app)
            .get('/trainer/getTrainer')
            .send()
            .end((err,res)=>{
                res.should.have.status(200)
            })
            done()
        })
    })

    