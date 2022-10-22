const express = require("express");
const router = express.Router();
const mainController = require("../Controllers/mainController");
const chooseGroupController = require("../Controllers/chooseGroupController");

router.get("/", mainController.index);
router.get("/chooseGroup", chooseGroupController.chooseGroup)

module.exports = router;