const express = require("express");
const     app = express();

const userRouter = require("./routes/userRouter");

//Статики
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/sass", express.static(__dirname + '/sass'));
app.use("/dist", express.static(__dirname + '/dist'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));

app.use("/user", userRouter);

app.listen(3000);