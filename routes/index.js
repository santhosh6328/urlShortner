const express = require("express");
const router = express.Router();
const helper = require("../libs/helper");

// url-shortner main api
router.get("/", async (req, res) => {
  try{
if (!helper.validateUrl(req.body.url)) {
  throw err;
}
const output = await helper.domainHandler(req.body.url);
res.status(200).send(output);
}catch(err){
  res.status(400).send("BAD REQUEST: invalid url");}
});

// api to assist debugging
router.get('/all', async(req, res) => {
  try{
    const result = await helper.getDB();
    res.send(result);
  }catch(err){
    res.status(400).send(err);
  }
});

module.exports = router;