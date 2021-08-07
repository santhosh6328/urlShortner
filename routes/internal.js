const express = require("express");
const router = express.Router();
const helper = require("../libs/helper");

// api to assist debugging
router.get("/all", async (req, res) => {
  try {
    const result = await helper.getDB();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
