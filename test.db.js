const Sequelize = require("sequelize");
const sequelize = new Sequelize("a0221501_gleb_oleg", "a0221501_gleb_oleg", "pDsq8J25", {
    dialect: "mysql",
    host: "141.8.192.37"
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
//     Title: "Москва намбер 2"
// })
// City.create({
//     Title: "Шуя намбер 2"
// })
// City.create({
//     Title: "Рязань намбер 2"
// })
// City.findAll({raw : true}).then(cities =>{
//     console.log(cities);
// }).catch(err=>console.log(err));
City.destroy({
    where: {
      Id: 12
    }
  }).then((res) => {
    console.log(res);
  });