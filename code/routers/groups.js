const express = require("express");
const router = express.Router();
const groupsController = require("../Controllers/groupsController");

router.get("/grupos", groupsController.groupsCreate)
router.get("/registro", groupsController.register)

module.exports = router;