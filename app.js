const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require("./routes");
require("dotenv").config();
require("./config/database").connect();

app.use(morgan("dev"));
app.use(express.json());
app.use("/", routes);

app.listen(3000, () => {
  console.log("server running on 3000");
});
