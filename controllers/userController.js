const userModel = require("../models/userModel");
const usermodel = new userModel();

exports.reg = function(req, res){
    res.render("registration.pug");
}

exports.checkLogin = function(req, res){
    let email = req.body.Email;
    if(email){
        usermodel.checkLogin(email).then(result => res.send(result));
    }
}

exports.registrate = function(req, res){
    usermodel.registrate(req.body).then(result => {
        if(result){
            res.send("Регистрация прошла успешно!");
        }
        else{
            res.send("Произошел капец...");
        }
    });
}

exports.auth = function(req, res){
    res.render("auth.pug");
}
exports.MainPage = function(req, res){
    res.render("MainPage.pug");
}
exports.Profile = function(req, res){
    res.render("Profile.pug");
}
exports.OtherProjects = function(req, res){
    res.render("OtherProjects.pug");
}
exports.Projects = function(req, res){
    res.render("Projects.pug");
}

exports.authorization = function(req, res){
    usermodel.authorization(req.body.login, req.body.password).then(result => {
        if(result){
            req.session.user = result;
            res.send(true);
        }
    })
}