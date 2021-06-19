const mysql = require("mysql");
class Database{

    constructor(){
        this.host = "mcounter.space";
        this.user = "a0221501_gleb_oleg";
        this.password = "pDsq8J25";
        this.database = "a0221501_gleb_oleg";
    }

    connect(){

        this.connection = mysql.createConnection({
            host : this.host,
            user : this.user,
            password : this.password,
            database : this.database
        });

        this.connection.connect(function(err){
            if(err){
                console.log(err.sqlMessage);
            }
            else{
                console.log("Подключение удалось");
            }
        });

    }

    doRequest(sql = "", data = []){
        let self = this;
        return new Promise(function(result, error){
            self.connection.query(sql, data, function(err, sqlData){
                if(!err){
                    result(sqlData);
                }
                else{
                    error(err);
                }
            });
        })
    }

}
module.exports = Database;
// let test = new Database();
// test.connect();
// test.doRequest("INSERT INTO `Users` (`Login`, `Password`, `Email, `Status`, `Hex`) VALUES (?, ?, ?, ?, ?)", ["Naka", "12345", "Саня", 1, "hthththththththt"]);