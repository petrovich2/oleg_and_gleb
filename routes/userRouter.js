const express = require("express");
const session = require("express-session");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

let checkSession = function(req, res, next){
    if(req.session.user){
        console.log(req.session.user);
        next();
    }
    else{
        res.redirect("./auth");
    }
}

userRouter.use("/reg", userController.reg);
userRouter.use("/auth", userController.auth);
userRouter.use("/registrate", urlencodedParser, userController.registrate);
userRouter.use("/authorization", urlencodedParser, userController.authorization);
userRouter.use("/checkLogin", urlencodedParser, userController.checkLogin);

userRouter.use("/MainPage", checkSession, userController.MainPage);
userRouter.use("/Profile", checkSession, userController.Profile);
userRouter.use("/OtherProjects", checkSession, userController.OtherProjects);
userRouter.use("/Projects", checkSession, userController.Projects);



module.exports = userRouter;