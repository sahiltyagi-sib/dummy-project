const express = require("express");
const app = express();
const routes = require("./routes");
require("dotenv").config();
require("./config/database").connect();

app.use(express.json());
app.use("/", routes);

app.listen(3000, () => {
  console.log("server running on 3000");
});
