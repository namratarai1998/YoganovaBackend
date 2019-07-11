var mySequelize = require("../  config/dbconfig");
var COURSE_MODEL = mySequelize.sequelize.define(
    'tblcourse', {
        courseId: {
            type: mySequelize.Sequelize.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        coursename: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        coursedesc: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },
    }, {
        freezeTableName: true, //decides whether to create table or not
         tableName: "tblcourse"
    }
);

COURSE_MODEL
.sync({force: false})
.then(function(){
    console.log("tblcourse created!!");
})

.catch(function(err){
    console.log(err, "tblcourse not created!!");
});

module.exports = {COURSE_MODEL};