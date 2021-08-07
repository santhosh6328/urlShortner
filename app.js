const express = require("express");
const app = express();
const index = require("./routes/index");
const internal = require("./routes/internal");
const port = process.env.PORT || 5000;

//parse-body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/", index);
app.use("/debug", internal);

app.listen(port, () => {
  console.log(`server is up and running at port: ${port}`);
});
