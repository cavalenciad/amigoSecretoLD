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
            firstcandy: req.body.firstCandy,
            valorE1: req.body.valorE1,
            secondcandy: req.body.secondCandy,
            valorE2: req.body.valorE2,
            finalmeeting: req.body.finalMeeting,
            
        })
            .then(() => {
                res.redirect("/registro")
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

    registerCreate: async (req, res) => {

        const resultValidation = validationResult(req);

        let member = await db.members.findOne({
            where: { idcard: req.body.idCard }
        })

        let allGroups = await db.groups.findAll({
            include: {
                all: true,
                nested: true
            }
        });

        let allMembers = await db.members.findAll({
            include: {
                all: true,
                nested: true
            },
            where: { id_groups: req.body.group }
        });

        let arrayMembers = allMembers.map(m => m.id)

        console.log(resultValidation.mapped());

        if (resultValidation.errors.length > 0) {
            res.render("register.ejs", { group: allGroups }, {
                errors: resultValidation.mapped(),
            })
        } else if (member != null) {
            res.render("register.ejs", { group: allGroups }, {
                errors: {
                    idCard: { msg: 'Ya estás registrado' }
                }
            })
            /* res.redirect('/registro'); */
        } else if (arrayMembers.length != 0) {
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
        } else {
            db.members.create({
                name: req.body.name,
                lastname: req.body.lastName,
                idcard: req.body.idCard,
                password: req.body.password,
                like: req.body.like,
                dislike: req.body.dislike,
                alergies: req.body.alergies,
                id_groups: req.body.group,
                rol: 1
            })
            res.redirect('/inicioSesion')
        }
    },

    login: (req, res) => {
        res.render("login.ejs");
    },

    processLogin: async (req, res) => {
        let friend = await db.members.findOne({
            where: { idcard: req.body.idCard },
            include: {
                all: true,
                nested: true
            }
        });

        let secretFriend = await db.members.findOne({
            where: { id: friend.id_member }
        })

        if (friend.id_member != null) {
            res.render('secretProfile', { 
                usuario: friend, 
                amigo: secretFriend
            })
        } else {
            res.render('profile', { 
                usuario: friend
            })
        }
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

    secretProfile:  (req, res) => {
        res.render("secretProfile.ejs");
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

            let idUser = member.id;
            let secretFriend = member.id_member;
            let idGroup = member.id_groups;
            let idFriend;

            let group = await db.groups.findAll({
                where: {id: idGroup}
            });

            let users = await db.members.findAll({
                where: { id_groups: member.id_groups }
            });

            let arrayId = users.map(id => id.id);
            let arrayId_member = users.map(id_member => id_member.id_member);

            let arrayCross = arrayId.filter(function (value) {
                return arrayId_member.indexOf(value) != -1;
            });

            let arrayToAnalyze = [];
            for (let i = 0; i < arrayId.length; i++) {
                let igual = false;
                for (let j = 0; j < arrayCross.length & !igual; j++) {
                    if (arrayId[i] === arrayCross[j])
                        igual = true;
                }
                if (!igual) arrayToAnalyze.push(arrayId[i]);
            }

            let indexId = arrayToAnalyze.indexOf(idUser);

            if (idUser && secretFriend === null) {

                if (indexId >= 0) {
                    arrayToAnalyze.splice(indexId, 1);
                }

                let randomNumber = Math.floor((Math.random() * arrayToAnalyze.length));
                randomId = arrayToAnalyze[randomNumber];

                let friend = await db.members.findOne({
                    where: { id: randomId }
                })

                res.render('secretProfile', { 
                    usuario: member, 
                    amigo: friend, 
                    grupo: group 
                })

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