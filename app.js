const express = require("express");
const app = express();
app.use(express.json());

//************ Routes import************
const authRout = require("./routes/authRoute");
const productRout = require("./routes/productRoute");
const blogRout = require("./routes/blogRoute");
const blogCatRout = require("./routes/blogCatRoute");
const productCatRout = require("./routes/productCatRoute");
const brandRout = require("./routes/brandRoute");
const coupnRout = require("./routes/coupnRoute");
const colorRout = require("./routes/colorRoute");
const enqRout = require("./routes/enqRoute");
const { notFound, errorHandler } = require("./middelwares/errorHandler");

app.use("/api/user", authRout);
app.use("/api/product", productRout);
app.use("/api/blog", blogRout);
app.use("/api/blogcategory", blogCatRout);
app.use("/api/productcategory", productCatRout);
app.use("/api/brand", brandRout);
app.use("/api/coupon", coupnRout);
app.use("/api/color", colorRout);
app.use("/api/enquiry", enqRout);

//************middel ware ******************
app.use(notFound);
app.use(errorHandler);
module.exports = app;
