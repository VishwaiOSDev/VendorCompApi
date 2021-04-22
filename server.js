const express = require("express");
const app = express();
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

//Connect to DB
mongoose.connect(
  "mongodb://localhost:27017/VendorDB?replicaSet=rs0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("DB connected");
  }
);

//Middlewares
app.use(express.json());

//Routes Middleware
app.use("/api/user", authRoute);

var server = app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
