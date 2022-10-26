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
router.get("/admin", groupsController.adminGroup)

router.post("/grupos", groupsController.groupsCreate)
router.post("/registro", validationMember, groupsController.registerCreate)

module.exports = router;