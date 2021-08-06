const helper = require("./libs/helper");
const express = require("express");
const app = express();

//parse-body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  try {
    if (!helper.urlValidation(req.body.url)) {
      throw err;
    }
    const result = await helper.urlShortner(req.body.url);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send("BAD REQUEST: invalid url");
  }
});

app.listen(port, () => {
  console.log("server is up !");
});
