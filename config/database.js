const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((e) => {
      console.log("database connection failed. exiting now");
      console.error(e);
      process.exit(1);
    });
};
