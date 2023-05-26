const bodyParser = require("body-parser");
const app = require("./app");
const { dbConnect } = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cookierParser = require("cookie-parser");
//*************** MOngooes connectDataBase ***************
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookierParser());
app.listen(PORT, () => {
  console.log(`server is listing on port ${PORT}`);
});
