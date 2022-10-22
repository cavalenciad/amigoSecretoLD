const db = require("../database/models");
const Op = db.Sequelize.Op;

const groupsController = {
    groupsForm: (req, res) => {
        res.render("groups.ejs");
    },

    groupsCreate: (req, res) => {
        //res.send("estoy viajando por post")

        /* let grupos = db.groups.findAll({
            include:{
                all: true,
                nestred: true
            }
        }) */

        db.members.findOne({
            where:{
                idcard: req.body.idCard
            }
        })
        .then((member) => {
            if(member){
                res.render('groups', {
                    errors: {
                        idcard: {
                            msg: 'Este usuario ya está registrado'
                        }
                    }
                })
            }else{
                db.groups.create({
                    groupname: req.body.groupName
                });
                db.members.create({
                    name: req.body.name,
                    lastname: req.body.lastName,
                    idcard: req.body.idCard,
                    password: req.body.password,
                    like: req.body.like,
                    dislike: req.body.dislike,
                    alergies: req.body.alergies,
                    rol: 1 //1 para administrador
                })
                .then((member) => {
                    res.redirect('/inicioSesion')
                });
            }
        })
    },

    register: (req, res) => {
        res.render("register.ejs");
    },

    chooseGroup: (req, res) => {
        res.render("chooseGroup.ejs");
    },

    login: (req, res) => {
        res.render("login.ejs");
    }
}

module.exports = groupsController;