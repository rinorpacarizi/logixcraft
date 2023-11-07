const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  throw new HttpError("Couldnt find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown error occured" });
});

mongoose.connect('mongodb+srv://rinor:admin1212@cluster0.2smdkhv.mongodb.net/database?retryWrites=true&w=majority').then(()=>{app.listen(5000);}).catch(err =>{console.log(err)});

