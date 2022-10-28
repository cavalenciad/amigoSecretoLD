const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');
const { localsName } = require("ejs");

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
                res.render("register.ejs", { group });
            })

    },

    registerCreate: (req, res) => {

        //const resultValidation = validationResult(req);

        db.members.findOne({
            where: { idcard: req.body.idCard },
        })
            .then((member) => {
                if (member) {
                    db.groups.findAll({
                        include: {
                            all: true,
                            nested: true
                        }
                    })
                        .then((group) => {
                            res.render('register.ejs', { group }, {
                                errors: {
                                    idcard: { msg: 'Ya estás registrado' }
                                }
                            })
                            //res.send('Ya estás registrado');
                        })
                } else {
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
            where: { idcard: req.params.idCard },
            include: {
                all: true,
                nested: true
            }
        })
            .then((member) => {
                res.render("profile", {
                    usuario: member
                })
            })
    },

    draw: async (req, res) => {
        try {

            let member = await db.members.findOne({
                where: { idcard: req.params.idCard },
                include: {
                    all: true,
                    nested: true
                }
            })

            let user = member.name;
            let secretFriend = member.id_member
            let idFriend;
            let randomName;

            let users = await db.members.findAll({
                where: { id_groups: member.id_groups }
            });

            let arrayId = users.map(id => id.id);
            let arrayId_member = users.map(id_member => id_member.id_member);

            let arrayCross = arrayId.filter(function(value) {
                return arrayId_member.indexOf(value) != -1;
            });

            console.log(arrayCross);

            let arrayNames = users.map(names => names.name);

            let indice = arrayNames.indexOf(user)

            if(user && secretFriend === null) {
                //let name = arrayNames[indice];

                if (indice >= 0) {
                    arrayNames.splice(indice, 1);
                }
                let randomNumber = Math.floor((Math.random() * arrayNames.length));
                randomName = arrayNames[randomNumber];

                let friend = await db.members.findOne({
                    where: {name: randomName}
                })
                
                res.render('profile', {usuario: member, amigo: friend})
    
                idFriend = friend.id
    
                await member.update({
                    id_member: idFriend
                })
            }

        }

        catch (error) {
            console.log(error);
            // res.render('error', { title: 'Error', msg: '500 - Ha ocurrido un error interno' });
            res.status(500).json({ 'msg': '500 - Ha ocurrido un error interno' });
        }
    },

    adminGroup: (req, res) => {
        db.groups.findByPk(req.params.id)
            .then((group) => {
                db.members.findAll({
                    where: { id_groups: group.id },
                    include: {
                        all: true,
                        nested: true
                    }
                })
                    .then((member) => {
                        res.render("adminGroup.ejs", { group, member });
                    })
            })
    }
}

module.exports = groupsController;