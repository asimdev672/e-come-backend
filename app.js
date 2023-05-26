const express = require("express");
const app = express();
app.use(express.json());

//************ Routes import************
const authRout = require("./routes/authRoute");
const productRout = require("./routes/productRoute");
const { notFound, errorHandler } = require("./middelwares/errorHandler");

app.use("/api/user", authRout);
app.use("/api/product", productRout);

//************middel ware ******************
app.use(notFound);
app.use(errorHandler);
module.exports = app;
