var mySequelize = require("../  config/dbconfig");
var BOOKEDCLASS_MODEL = mySequelize.sequelize.define(
    'tblbookclass', {
        bookingId: {
            type: mySequelize.Sequelize.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        username: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        useremail: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        coursename: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        trainername: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        day: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        time: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },
    }, {
        freezeTableName: false, //decides whether to create table or not 
        tableName: "tblbookclass"
    }
);

BOOKEDCLASS_MODEL
.sync({force: false})
.then(function(){
    console.log("tblbookclass created!!!");
})

.catch(function(err){
    console.log(err, "tblbookclass not created!!!");
});

module.exports = {BOOKEDCLASS_MODEL};