var mySequelize = require("../  config/dbconfig");
var USER_MODEL = mySequelize.sequelize.define(
    'tblusers',{
        userId: {
            type: mySequelize.Sequelize.BIGINT(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        fname: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },


        lname: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },


        username: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        usertype: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        emailid: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        password: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },


        gender: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        address: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },

        contactno: {
            type: mySequelize.Sequelize.STRING,
            allowNull: true
        },
    },{
        freezeTableName: true, //decides whether to create table or not
        tableName: "tblusers"
    }
);

USER_MODEL
.sync({force: false}) 
.then(function(){
    console.log("tblusers table created!");
})

.catch(function(err){
    console.log(err, "tblusers not created!");
});

module.exports = {USER_MODEL};