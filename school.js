const Sequelize = require("sequelize");
const sequelize = new Sequelize("a0221501_gleb", "a0221501_gleb", "JuiYaUoT", {
    dialect: "mysql",
    host: "141.8.192.37"
});

const Executors = sequelize.define("Executors", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NumberOfAlbums: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const AlbumsOfLida = sequelize.define("Albums", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
sequelize.sync().then(result=>{
    console.log("Синхронизация прошла");
})
.catch(err=> console.log(err));

