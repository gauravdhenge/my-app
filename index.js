const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/user");
const { connectMongoDb } = require('./connection');
const { logReqRes } = require("./middlewares");

//connect mongodb
connectMongoDb('mongodb://localhost:27017/myapp-1').then(()=> console.log("Mongo DB Connected"));

//adding url encodeing with middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server started: ${PORT}`);
});

