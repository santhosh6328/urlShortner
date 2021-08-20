const express = require("express");
const router = express.Router();
const helper = require("../libs/helper");
const path = require("path");

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
    if (req.params.hash === "expired") {
      res.status(200).sendFile(path.join(__dirname, "/expired.html"));
      return;
    }
    if (req.params.hash === "not-found") {
      res.status(200).sendFile(path.join(__dirname, "/not-found.html"));
      return;
    }
    const output = await helper.hashHandler(req.params.hash);
    res.status(200).redirect(output);
  } catch (err) {
    res.status(400).send("BAD REQUEST: invalid hash");
  }
});

module.exports = router;
