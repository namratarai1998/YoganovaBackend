const uModel = require("../model/UserModel");
const Bcrypt = require("bcrypt");
const tokens = require('jsonwebtoken');



//function for adding user into database
function addUser(req, res, next) {
    console.log(req.body);
    uModel.USER_MODEL.create({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        usertype: 'user',
        emailid: req.body.emailid,
        password: req.pwdhash,
        gender: req.body.gender,
        address: req.body.address,
        contactno: req.body.contactno
    }).then(function (result) {
        next();
    }).catch(function (err) {
        console.log(err);
        next({
            "status": 500,
            "message": "Couldnot Register User!, Database Error!"
        });
    });
}
////////////////////////////////////////////////////////////////////////////


//getting all users by id
function searchUserByID(req, res, next) {
    uModel.USER_MODEL.findAll({
        where: { userid: req.params.uid }
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
///////////////////////////////////////////////////////

///get all user
function getUser(req, res, next) {
    uModel.USER_MODEL.findAll({
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};
/////////////////////////////////////////////
//getting user by name 
function searchUserByEmail(req, res, next) {
    uModel.USER_MODEL.findAll({
        where: { emailid: req.params.eid }
    })
        .then(function (result) {
            res.json(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};


//for updating user
function updateUser(req, res, next) {
    console.log(req.params.uid);
    var user = {
        fname: req.body.fname,
        lname: req.body.lname,
        usertype: req.body.usertype,
        emailid: req.body.emailid,
        gender: req.body.gender,
        address: req.body.address,
        password:  req.pwdhash,
        contactno: req.body.contactno
    }

    uModel.USER_MODEL.update(user, { where: { userId: req.params.uid } })
        .then(function (result) {
            res.status(201);
            res.send({ message: "Updated Successfully!!" });
            next();
        }).catch(function (err) {
            console.log(err)
            next({
                "status": 500,
                "message": "Couldnot Update User, Database Error!!"
            });
        })
}
//////////////////////////////////////////////////////////////////////////////////////////////////


//for deleting users
function deleteUser(req, res, next) {
    console.log(req.body);
    uModel.USER_MODEL.destroy({
        where: { userId: req.params.uid }
    }).then(function (result) {
        res.status(200);
        res.send({ "message": "User Deleted !!!!" })
        next();
    }).catch(function (err) {
        next({ status: 500, "message": "Couldnot Delete User, Database Error!! " });
    });
}
////////////////////////////////////////////////////////////////////////////////////////


//password encryption
var saltRounds = 10;
function generateHash(req, res, next) {
    console.log(req.body.password);
    Bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            req.pwdhash = hash;
            console.log(hash);
            next();
        })
        .catch(function (err) {
            console.log(err);
        });
}
////////////////////////////////////////////////////////////

//for checking user's detail from database
function userCheck(req, res, next) {
    uModel.USER_MODEL.findOne({
        where: { username: req.body.username }
    })
        .then(function (result) {
            if (result != null) {
                req.pwdhash = result.dataValues.password;
                next();
            } else {
                next({ "status": 409, "message": "User already exist" });
            }
        })
        .catch(function (err) {
            next({ "status": 400, "message": err });
        })
}
//////////////////////////////////////////////////

//for login validation
function loginValidate(req, res, next) {
   console.log(req.body);
   uModel.USER_MODEL.findOne({
    where: { emailid: req.body.emailid,usertype:req.body.usertype}
})
    .then(function (result) {
        console.log(result);
        req.emailid = result.dataValues.emailid;
        req.usertype = result.dataValues.usertype;

        if (result != null) {

            Bcrypt.compare(req.body.password, result.dataValues.password, function (err, res) {
                if (res) {
                    next();
                } else {
                    next({ "status": 409, "message": "Password didnot match!" });
                }
            });
        } else {
            next({ status: 409, message: "Credential didnot match!" });
        }
    })
    .catch(function (err) {
        next({ status: 409, message: "Error Occured!" });
    })
}
///////////////////////////////////////////
function generateTokenAuth(req,res,next){
        tokens.sign({
            emailid:req.body.emailid,
            accessLevel:'superadmin'
        },'thisissecretkey',{
            expiresIn:'8d'
        },(err,token)=>{
            if(err != null || undefined){
                console.log(err);
                next({'status':401,"message":"unauthorized token"})
            }else{
                req.tokenGenerate = token;
                next();
            }
        })
}

///////////////////////////////////////////
function verifyToken(req,res, next){
    console.log(req.headers);
    if (req.headers.authorization == undefined){
        next({
            status: 500, message: 'No authorization header present!'
        })
    } else {
        let token = req.headers.authorization.slice(7, req.headers.authorization.length)
        token.verify(token, 'thisissecretkey', function(err, decoded){
            console.log(decoded);
            if (err != null){
                next({status:500, message: err.message})
                console.log(err);
            }else{
                next();
            }
        })
    }
}


//for password check
function pwdCheck(req, res, next) {
    Bcrypt
        .compare(req.body.password, req.pwdhash)
        .then(function (result) {
            next();
        })
        .catch(function (err) {
            next({ "status": 400, "message": "Password doesnot match!" });
        });
}
////////////////////////////////////////




module.exports = {
    addUser,
    searchUserByEmail,
    searchUserByID,
    generateTokenAuth,
    verifyToken,
    getUser,
    generateHash,
    userCheck,
    loginValidate,
    pwdCheck,
    updateUser,
    deleteUser
}