const Sequelize = require("sequelize");
const database = require("../core/Database");
const md5 = require("md5");
const CryptoJs = require("crypto-js");

class userModel{
    
    constructor(){

        this.sequelize = new Sequelize("a0221501_gleb_oleg", "a0221501_gleb_oleg", "pDsq8J25", {
            dialect: "mysql",
            host: "141.8.192.37"
        });

         this.User = this.sequelize.define("Users", {
            Id : {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            Login : {
                type: Sequelize.STRING,
                allowNull: false
            },
            Name : {
                type: Sequelize.STRING,
                allowNull : false
            },
            Password : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Email : {
                type: Sequelize.STRING,
                allowNull: false
            },
            Status : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Hex : {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        })
        
        this.sequelize.sync().then(result=>{
            console.log(`Синхронизация прошла`);
        })

    }

    checkLogin(login){
        let self = this;
        let result = new Promise(function(res, rej){
            self.User.findOne({where: {Login: md5(login)}}).then(function(result){
                    if(result){
                        res(true);
                    }
                    else{
                        res(false)
                    }
                });
            });
        return result;
    }

    registrate(data){
        let self = this;
        let login = md5(data.Email);
        let result = new Promise(function(res, rej){
            self.checkLogin(login).then(function(isLoginExist){
                if(isLoginExist){
                    res(false);
                }
                else{
                    let hex = self.generateHex(8);
                    let name = self.testEncrypt(data.Name, hex);
                    let password = self.testEncrypt(data.Password, hex);
                    let email = self.testEncrypt(data.Email, hex);
                    self.User.create({
                        Login: login,//md5
                        Name: name,
                        Password: password,
                        Email: email,
                        Status: data.Status,//не шифруем
                        Hex: hex//не шифруем
                        
                    }).then(users =>{
                        res(true);
                    });
                }
    
            });
        });
        return result;
    }

    authorization(login, password){
        let self = this;
        let isLoginExist;
        this.checkLogin2(login).then(function(res){
            isLoginExist = res
            if(isLoginExist){
                self.User.findOne({where: {Password: password, Login: login}}).then(function(password){
                    if(password){
                        console.log("Добро пожаловать в таверну, юный сталкер");
                    }
                    else{
                        console.log("Вали с таверны");
                    }}, function(error) {
                        console.log(error)}
                    
                    )
                console.log("Логин есть");
            }
            else{
                console.log("Логина нет");
            }

        });
    }

    generateHex(length){
        let symbol = [
            "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
            "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z",
            "X", "C", "V", "B", "N", "M",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "a", "s", "d", "f", "g", "h", "j", "k", "l",
            "z", "x", "c", "v", "b", "n", "m",
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
        ];
        let hex = "";
        for(let i = 0; i < length; i++){
            let rand = Math.round(Math.random()*symbol.length);
            hex += symbol[rand];
        }
        return hex;
    }

    test(login){
        //Создание
        let name = "Олег";
        let hash = md5(name);
        let hashLogin = md5(login);
        console.log(hash);
        console.log(hashLogin);
    }

    testEncrypt(text, key){
        let encrypted = CryptoJs.AES.encrypt(text, key).toString();
        return encrypted;
    }

    testDecrypt(text, key){
        let bytes = CryptoJs.AES.decrypt(text, key);
        let decrypted = bytes.toString(CryptoJs.enc.Utf8);
        console.log(decrypted);
        return decrypted;
    }

}

let f = new userModel();

let hex = f.generateHex(8);
let encrypted = f.testEncrypt("Олег", hex);
let decrypted = f.testDecrypt(encrypted, hex);

console.log(`Зашифровано - ${encrypted}`);
console.log(`Расшифровано - ${decrypted}`);

// f.registrate({Login: "Oleg2", Password: "123", Email: "gg@.com", Status: 2}).then(res => console.log(res));
// // f.authorization("Алексей", 123);
module.exports = userModel;