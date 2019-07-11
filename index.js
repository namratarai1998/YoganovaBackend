const express = require('express');
const bodyparser = require('body-parser');
const myapp = express();
// const port = process.env.PORT;
//for usercontroller
const UserController = require("./controller/UserController")
const TrainerController = require("./controller/TrainerController")
const CourseController = require("./controller/CourseController")
const BookingController = require("./controller/BookingController")
myapp.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "content-type,X-Requested-With,authorization");
    next();
});

myapp.use(bodyparser.json());
myapp.use(bodyparser.urlencoded({
    extended: true
}))


var path =  require("path");
myapp.use(express.static(path.join(__dirname, "upload")));

//user route
myapp.post("/user",
    UserController.generateHash,
    UserController.addUser,
    function (req, res, next) {
        console.log(req.body);
        res.json({
            "message": "User Registered!"
        })
    });

myapp.post("/user/login",
    UserController.generateTokenAuth,
    UserController.loginValidate, function (req, res, next) {
        res.status(200);
        res.send({
            "token": req.tokenGenerate,
            "emailid": req.emailid,
            "usertype": req.usertype,
            "message": "Login Successful!!"
        });
    });


//for getting all the userlist
myapp.get("/user/getUser",
    UserController.getUser,
    function (req, res, next) {
        console.log(req.body);
    });


myapp.get("/user/getUser/:uid",
    UserController.searchUserByID,
    function (req, res, next) {
        console.log(req.body);
    });
myapp.get("/user/getUserByEmail/:eid", UserController.searchUserByEmail);

//for deleting user
myapp.delete("/user/delete/:uid", UserController.deleteUser);

//for updating user
myapp.put("/user/update/:uid", UserController.updateUser);



//trainer route
myapp.post("/trainer",
    TrainerController.addTrainer,
    function (req, res, next) {
        console.log(req.body);
        res.json({
            "message": "Trainer Added!"
        })
    });


//for deleting trainer
myapp.delete("/trainer/delete/:tid", TrainerController.deleteTrainer);



//for updating trainer
myapp.put("/trainer/update/:tid", TrainerController.updateTrainer);


///for getting trainer data
myapp.get("/trainer/getTrainer", TrainerController.getTrainer);

//for getting trainer data by id
myapp.get("/trainer/:tid", TrainerController.getTrainerById);


//for course route
myapp.post("/course", CourseController.addCourse,
    function (req, res, next) {
        console.log(req.body);
        res.json({
            "message": "Course Added!"
        })
    });

//for deleting course
myapp.delete("/course/delete/:cid", CourseController.deleteCourse);

//for updating course
myapp.put("/course/update/:cid", CourseController.updateCourse);


//getting course data 
myapp.get("/course/getCourse", CourseController.getCourse);

//getting course data by id
myapp.get("/course/:cid", CourseController.getCourseById);

// myapp.use(function(err,req,res,next){
//     console.log(err);
//     res.status(err.status);
//     res.send({
//         "messge": err.message
//     })
// })

//for booking route
myapp.post("/book", BookingController.addBooking,
    function (req, res, next) {
        console.log(req.body);
        res.json({
            "message": " Class Booked!"
        })
    });

//for deleting booking
myapp.delete("/book/delete/:bid", BookingController.deleteBooking);


//for updating booking
myapp.put("/book/update/:bid", BookingController.updateBooking);

//for getting all the bookings
myapp.get("/book/getBooking",
    BookingController.getBookedClass,
    function (req, res, next) {
        console.log(req.body);
    });
    
myapp.get("/book/getBooking/:bid",
    BookingController.getBookingById,
    function (req, res, next) {
        console.log(req.body);
    });


myapp.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status);
    res.send({
        "message": err.message
    })
})

myapp.listen(process.env.PORT, function () {
    try {
        console.log("Server Started!" + process.env.PORT);
    } catch (error) {
        console.log("Server not Started!");
    }
});

// kill -9 $(lsof -t -i:3000 -sTCP:LISTEN)