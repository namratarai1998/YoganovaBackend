const Sequelize = require('sequelize');
const sequelize = new Sequelize('yogadb','root', 'password1',{
    host: "localhost",
    dialect : "mysql",
    logging:false
})
//database configuration connection 
console.log('database starting');
sequelize.authenticate()
.then(function(){
    console.log('Database Connected!')
})

.catch(function(err){
    console.log(err)
})

module.exports = {
    Sequelize,
    sequelize
    
}