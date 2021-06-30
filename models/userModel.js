const Sequelize = require("sequelize");
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
                        res(result);
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
                    let name = self.encrypt(data.Name, hex);
                    let password = self.encrypt(data.Password, hex);
                    let email = self.encrypt(data.Email, hex);
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
        let result = new Promise(function(resolve, reject){
            self.checkLogin(login).then(function(result){
                let token = result.Hex;
                let dbPassword = self.decrypt(result.Password, token);
                if(password === dbPassword){
                    let name = self.decrypt(result.Name, token);
                    let user = {
                        id : result.Id,
                        name,
                        status : result.Status,
                        email : login
                    };
                    resolve(user);
                }
                else{
                    resolve(false);
                }
            })
        })
        return result;
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

    encrypt(text, key){
        let encrypted = CryptoJs.AES.encrypt(text, key).toString();
        return encrypted;
    }

    decrypt(text, key){
        let bytes = CryptoJs.AES.decrypt(text, key);
        let decrypted = bytes.toString(CryptoJs.enc.Utf8);
        return decrypted;
    }

}
module.exports = userModel;