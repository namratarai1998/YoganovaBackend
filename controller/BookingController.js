const uModel = require("../model/BookingModel");
const Bcrypt = require("bcrypt");

//function for adding booking into database
function addBooking(req, res, next){
    console.log(req.body);
    uModel.BOOKEDCLASS_MODEL.create({
        username: req.body.username,
        useremail: req.body.useremail,
        coursename: req.body.coursename,
        trainername: req.body.trainername,
        day: req.body.day,
        time: req.body.time
    }).then(function(result){
        next();
    }).catch(function(err){
        console.log(err);
        next({
            "status":500,
            "message": "Couldnot Book Class!, Database Error!"
        });
    });
}

//getting all booked class
function getBookedClass(req, res, next){
    uModel.BOOKEDCLASS_MODEL.findAll({})
    .then(function(result){
        console.log(req.body);
        res.status(200);
        res.json(result);
    }).catch(function(err){
        console.log(err);
    })
}


//getting all booking by id
function getBookingById(req, res, next){
    uModel.BOOKEDCLASS_MODEL.findAll({
        where:{bookingId:req.params.bid}
    })
    .then(function(result){
        console.log(req.body);
        res.status(200);
        res.json(result);
    }).catch(function(err){
        console.log(err);
    })
}

//deleting all appointment
function deleteBooking(req, res, next){
    uModel.BOOKEDCLASS_MODEL.destroy({
        where: { bookingId: req.params.bid }
    }).then(function(result){
        console.log(req.body);
        res.status(200);
        res.send({ "message": "Deleted Booking Successfully!!" });
    }).catch(function(err){
        console.log(err);
    })
}


//updating all appointment
function updateBooking(req, res, next){
    var booking = {
        username: req.body.username,
        useremail: req.body.useremail,
        coursename: req.body.coursename,
        trainername: req.body.trainername,
        day: req.body.day,
        time: req.body.time
    }

    uModel.BOOKEDCLASS_MODEL.update(booking, {
        where: { bookingId: req.params.bid }
    }).then(function(result){
        console.log(req.body);
        res.send({ "message": "Updated Successfully!!!" });
    }).catch(function(err){
        console.log(err);
    })
}

module.exports = {
    addBooking,
    getBookedClass,
    getBookingById,
    deleteBooking,
    updateBooking
}