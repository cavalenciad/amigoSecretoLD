const express = require("express");
const router = express.Router();
const groupsController = require("../Controllers/groupsController");
const { body } = require('express-validator');

const validationMember = [
    body ('name').notEmpty().withMessage('Debes ingresar tu nombre'),
    body ('lastName').notEmpty().withMessage('Recuerda ingresar tu apellido'),
    body ('idCard').notEmpty().withMessage('Es muy importante tu documento de identidad'),
    body ('like').notEmpty().withMessage('No olvides ingresar tus gustos'),
    body ('dislike').notEmpty().withMessage('Es importante indicar lo que no te gusta'),
    body ('alergies').notEmpty().withMessage('¿Cuáles son tus alergias?'),
]

router.get("/grupos", groupsController.groupsForm)
router.get("/registro", groupsController.register)
router.get("/inicioSesion", groupsController.login)
router.get("/admin/:id", groupsController.adminGroup)
router.get("/profile/:idCard", groupsController.profile);

router.post("/grupos", groupsController.groupsCreate)
router.post("/registro", validationMember, groupsController.registerCreate)
<<<<<<< HEAD
router.post('/inicioSesion', groupsController.profile);
=======
router.post('/inicioSesion', groupsController.processLogin);
router.post("/profile/:idCard", groupsController.draw)
//router.post('/inicioSesion', groupsController.profile);
>>>>>>> 1b79085c4798b0c111873a96ee3b89e539f5c2c4

module.exports = router;