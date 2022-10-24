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

    login: (req, res) => {
        res.render("login.ejs");
    }
}

module.exports = groupsController;