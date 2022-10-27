const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');

const groupsController = {
    groupsForm: (req, res) => {
        res.render("groups.ejs");
    },

    groupsCreate: (req, res) => {
        db.groups.create({
            groupname: req.body.groupName,
        })
        .then(() => {
            res.redirect("/inicioSesion")
        })
    },

    register: (req, res) => {
        
        db.groups.findAll({
            include: {
                all: true,
                nested: true
            }
        })
        .then((group) => {
            res.render("register.ejs", {group});
        })

    },

    registerCreate: (req, res) => {

        //const resultValidation = validationResult(req);

        db.members.findOne({
            where:{idcard: req.body.idCard},
        })
        .then((member) => {
            if(member){
                db.groups.findAll({
                    include: {
                        all: true,
                        nested: true
                    }
                })
                .then((group) => {
                    res.render('register.ejs', {group}, {
                        errors: {
                            idcard: { msg: 'Ya estás registrado' }
                        }
                    })
                    //res.send('Ya estás registrado');
                })                    
            }else{
                db.members.create({
                    name: req.body.name,
                    lastname: req.body.lastName,
                    idcard: req.body.idCard,
                    password: req.body.password,
                    like: req.body.like,
                    dislike: req.body.dislike,
                    alergies: req.body.alergies,
                    id_groups: req.body.group
                })
                res.redirect('/inicioSesion')
            }
        })
    },    

    login: (req, res) => {
        res.render("login.ejs");
    },

    profile: (req, res) => {
        db.members.findOne({
            where: {idcard: req.params.idCard},
            include: {
                all: true,
                nested: true
            }
        })
        .then((userFound) => {
            res.render("profile", {
                usuario: userFound,
                //user: req.session.usuarioLogueado
            });
        })
    },

    adminGroup: (req, res) => {
        db.groups.findByPk(req.params.id)
        .then((group) => {
            db.members.findAll({
                where: {id_groups: group.id},
                include: {
                    all: true,
                    nested: true
                }
            })
            .then((member) => {
                res.render("adminGroup.ejs", {group, member});
            })
        })
    }
}

module.exports = groupsController;