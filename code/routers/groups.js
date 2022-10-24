const express = require("express");
const router = express.Router();
const groupsController = require("../Controllers/groupsController");

router.get("/grupos", groupsController.groupsForm)
router.get("/registro", groupsController.register)
router.get("/inicioSesion", groupsController.login)

router.post("/grupos", groupsController.groupsCreate)

module.exports = router;