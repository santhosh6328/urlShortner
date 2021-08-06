const express = require("express");
const app = express();
const index = require("./routes/index");
const port = process.env.PORT || 5000;

//parse-body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', index);

app.listen(port, () => {
  console.log(`server is up and running at port: ${port}`);
});
