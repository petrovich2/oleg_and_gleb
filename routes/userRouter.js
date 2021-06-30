const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

userRouter.use("/reg", userController.reg);
userRouter.use("/auth", userController.auth);
userRouter.use("/registrate", urlencodedParser, userController.registrate);
userRouter.use("/authorization", urlencodedParser, userController.authorization);
userRouter.use("/checkLogin", urlencodedParser ,userController.checkLogin);

userRouter.use("/MainPage", userController.MainPage);
userRouter.use("/Profile", userController.Profile);
userRouter.use("/OtherProjects", userController.OtherProjects);
userRouter.use("/Projects", userController.Projects);


module.exports = userRouter;