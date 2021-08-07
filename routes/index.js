const express = require("express");
const router = express.Router();
const helper = require("../libs/helper");

// helps storing the domain value
router.post("/", async (req, res) => {
  try {
    if (!helper.validateUrl(req.body.url)) {
      throw err;
    }
    const output = await helper.domainHandler(req.body.url);
    res.status(200).send(output);
  } catch (err) {
    res.status(400).send("BAD REQUEST: invalid url");
  }
});

// helps retriving domain value from hash
router.get("/:hash", async (req, res) => {
  try {
    const output = await helper.hashHandler(req.params.hash);
    res.status(200).send(output);
  } catch (err) {
    res.status(400).send("BAD REQUEST: invalid hash");
  }
});

module.exports = router;
