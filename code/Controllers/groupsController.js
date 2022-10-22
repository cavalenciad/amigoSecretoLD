

const groupsController = {
    groupsCreate: (req, res) => {
        res.render("groups.ejs");
    },

    register: (req, res) => {
        res.render("register.ejs");
    }
}

module.exports = groupsController;