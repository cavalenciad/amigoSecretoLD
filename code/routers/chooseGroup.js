const express = require("express");
const router = express.Router();
const chooseGroupController = require("../Controllers/chooseGroupController");

router.post("/chooseGroup", chooseGroupController.chooseGroup)

module.exports = router;