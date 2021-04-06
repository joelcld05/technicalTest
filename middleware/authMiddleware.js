
module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect("/login");
        }
    },

    goHomeIfLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        } else {
            return next();
        }
    },

    checkPermisions: (req, res, next) => {
        if (req.user.roles.includes("Editor")) {
            return next();
        } else {
            return res.redirect("/news");
        }
    }
}
