const uModel = require("../model/TrainerModel");
const Bcrypt = require("bcrypt");

function addTrainer(req, res, next) {
    console.log(req.body);
    uModel.TRAINER_MODEL.create({
        trainername: req.body.trainername,
        qualification: req.body.qualification,
        experience: req.body.experience
    }).then(function (result) {
        next();
    }).catch(function (err) {
        console.log(err);
        next({
            "status": 500,
            "message": "Couldnot Add Trainer!, Database Error!"
        });
    });
}


//getting all trainer
function getTrainer(req, res, next) {
    uModel.TRAINER_MODEL.findAll({})
        .then(function (result) {
            console.log(req.body);
            res.status(200);
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
}


//getting all trainer by id
function getTrainerById(req, res, next) {
    uModel.TRAINER_MODEL.findAll({
        where: {trainerId: req.params.tid}
    })
        .then(function (result) {
            console.log(req.body);
            res.status(200);
            res.json(result);
        }).catch(function (err) {
            console.log(err);
        })
}


//deleting all trainer
function deleteTrainer(req, res, next) {
    uModel.TRAINER_MODEL.destroy({
        where: { trainerId: req.params.tid }
    }).then(function (result) {
        console.log(req.body);
        res.status(200);
        res.send({ "message": "Deleted Successfully!!!" });
    }).catch(function (err) {
        console.log(err);
    })
}

//updating all trainer
function updateTrainer(req, res, next) {
    var trainer = {
        trainername: req.body.trainername,
        qualification: req.body.qualification,
        experience: req.body.experience
    }

    uModel.TRAINER_MODEL.update(trainer,{
        where: { trainerId: req.params.tid }
    }).then(function (result) {
        console.log(req.body);
        res.status(200);
        res.send({ "message": "Updated Successfully!!!" });
    }).catch(function (err) {
        console.log(err);
    })
}

module.exports = {
    addTrainer,
    getTrainer,
    deleteTrainer,
    updateTrainer,
    getTrainerById
}