const express = require("express");
const helper = require("./libs/helper");

const app = express();

//parse-body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await helper.urlShortner(req.body.url);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send('BAD REQUEST');
  }
});

app.listen(3000, () => {
  console.log("server is up !");
});
