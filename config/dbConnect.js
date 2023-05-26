const mongooes = require("mongoose");

exports.dbConnect = () => {
  mongooes
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database sucessfully connect`);
    });
};
