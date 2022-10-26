const db = require("../database/models");
const Op = db.Sequelize.Op;

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
                    /* res.render('register.ejs', {group}, {
                        errors: {
                            idcard: { msg: 'Ya estás registrado' }
                        }
                    }) */
                    res.send('Ya estás registrado');
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

    adminGroup: (req, res) => {
        res.render("adminGroup.ejs");
}
}

module.exports = groupsController;