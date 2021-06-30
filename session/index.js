const express = require("express");
const session = require("express-session");
const app = express();

const bodyParser = require("body-parser")
const urlEncodedParser = bodyParser.urlencoded({extended : false});


app.use(session({
    secret : "super secret",
    cookie : {maxAge : 3600000},
    resave: true,
    saveUninitialized : true
}))



app.use("/auth", urlEncodedParser, function(req, res){
    console.log(req.body.login, req.body.password);
    if(req.body.login === login && req.body.password === password){
        req.session.user = login;
        res.redirect("/profile");
    }
    else{
        res.redirect("/login");
    }
})

app.use("/login", function(req, res){
    res.sendFile(__dirname + "/views/login.html");
});

app.use("/profile", checkSession, function(req, res){
    res.sendFile(__dirname + "/views/profile.html");
});

app.listen(3000);