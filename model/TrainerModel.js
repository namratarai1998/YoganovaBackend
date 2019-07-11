var mySequelize = require("../  config/dbconfig");
var TRAINER_MODEL = mySequelize.sequelize.define(
    'tbltrainer',{
        trainerId: {
            type: mySequelize.Sequelize.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        trainername: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        qualification: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        experience: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },
    }, {
        freezeTableName: true, //decides whether to create table or not
        tableName: "tbltrainer"
    }
);

TRAINER_MODEL
.sync({force: false})
.then(function(){
    console.log("tbltrainer table created!");
})

.catch(function(err){
    console.log(err, "tbltrainer not created!");
});

module.exports = {TRAINER_MODEL};