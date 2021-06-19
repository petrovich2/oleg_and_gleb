const Sequelize = require("sequelize");
const sequelize = new Sequelize("a0221501_gleb_oleg", "a0221501_gleb_oleg", "pDsq8J25", {
    dialect: "mysql",
    host: "mcounter.space"
});
const City = sequelize.define("Cities",{
    Id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Title : {
        type: Sequelize.STRING,
        allowNull: false
    }
});
sequelize.sync().then(result=>{
    console.log("Синхронизация прошла");
})
.catch(err=> console.log(err));

// City.create({
//     Title : "Иваново"
// })

// City.findAll({raw : true}).then(cities =>{
//     console.log(cities);
// }).catch(err=>console.log(err));

City.destroy({
    where: {
      Id: 10
    }
  }).then((res) => {
    console.log(res);
  });