const express = require("express");
const router = express.Router();
const helper = require("../libs/helper");

router.get('/all', async(req, res) => {
    const result = await helper.getDB();
    res.send(result);
});

router.get("/", async (req, res) => {
    try{
  if (!helper.urlValidation(req.body.url)) {
    throw err;
  }
  const output = await helper.urlShortner(req.body.url);
  res.status(200).send(output);
}catch(err){
    res.status(400).send("BAD REQUEST: invalid url");}
});

module.exports = router;